import { Context, controller, inject, get, post, del, provide, put } from 'midway';
import {
  IAuthGroup,
  IAuthUser
} from '@/interface/model';
import baseController from "../core/baseController";
import { pick, union, difference } from 'underscore';
import { IService } from '@/interface/authGroupService'

@provide()
@controller('/admin/group')
export class authGroupController extends baseController {
  
  @inject()
  ctx: Context;

  @inject('AuthGroupService')
  service: IService

  @get('/')
  async index() {
    const { query } = this.ctx.request;
    const { pageNumber = 1, pageSize = 10 } = query
    // 获取传参中指定的key，且过滤掉为`空`的条件。
    const where = pick(pick(query, ...['name']), value => value !== '' && value !== undefined);

    const result = await this.service.list({
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize), 
      query: {
      ...where,
      disable: { $ne: true },
    }});
    if (result) {
      this.success({
        ...result,
        list: result.list.map((obj: IAuthGroup) => pick(obj, '_id', 'name', 'describe')),
      });
    }
  }


  @post('/')
  async create() {
    const query = this.ctx.request.body;
    console.log('query', query)
    const createRule = {
      name: {
        type: 'string',
        required: true,
      },
      describe: {
        type: 'string',
        required: false,
      },
      modules: {
        type: 'array',
        required: false,
      },
    };

    try {
      this.ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);
      return;
    }

    const isExist = await this.ctx.model.AuthGroup.findOne({
      name: query.name,
    });

    if (isExist) {
      this.failure({
        code: '-1',
        msg: '组名已存在',
        data: {
          name: query.name,
        },
        state: 422,
      });

      return;
    }
    const params = {
      name: '',
      ...pick(
        query, 
        ...Object.keys(createRule)
      )
    }
    const result = await this.service.create(params);

    if (result) {
      this.success(
        result,
        201,
      );
    }
  }

  @del('/:id')
  async destroy() {
    const { id } = this.ctx.params;
    if (!id) return this.failure({})
    await this.service.destroy(id);

    this.success();
  }

  
  @get('/:id')
  async detail() {
    const query = this.ctx.params;

    const result = await this.service.detail(query.id);

    if (!result) {
      this.failure({
        data: {},
        state: 404,
      });

      return false;
    }

    return this.success(result);
  }

  
  @put('/:id')
  async update() {
    const { id } = this.ctx.params;
    const query = this.ctx.request.body;

    const isExist = await this.ctx.model.AuthGroup.findOne({
      _id: {
        $ne: id,
      },
      name: query.name,
    });
    if (isExist) {
      this.failure({
        code: '-1',
        msg: '组名已存在',
        data: {
          name: query.name,
        },
        state: 422,
      });

      return false;
    }

    const result = await this.service.update(
      id,
      {
        name: '',
        ...pick(query, ...['name', 'describe', 'modules']),
      }
    );

    if (!result) {
      this.failure({
        data: {},
        state: 404,
      });

      return false;
    }

    return this.success();
  }

  
  
  @get('/user/:id')
  async getUser() {
    const { ctx } = this;
    const query = ctx.params;
    let { pageSize = 10, pageNo = 1, searchType = 1, searchKey = '' } = ctx.request.query;
    pageSize = Number(pageSize);
    pageNo = Number(pageNo);
    searchType = Number(searchType);
    searchKey = searchKey.trim();

    const idArr = (
      await ctx.model.AuthGroup.findOne({
        _id: query.id,
      })
    ).users;

    const queryParms: any = {
      _id: { $in: idArr },
    };
    if (searchKey) {
      const reg = new RegExp(searchKey, 'i');
      if (searchType === 1) queryParms.name = { $regex: reg };
      if (searchType === 2) queryParms.account = { $regex: reg };
    }

    const total = await ctx.model.AuthUser.find(queryParms).countDocuments();
    const userArr = (
      await ctx.model.AuthUser.find(queryParms)
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .exec()
    ).map((item: IAuthUser) => pick(item, 'account', 'avatar', 'name', '_id'));

    this.success({
      list: userArr || [],
      total,
    });
  }

 
  @put('/user/:id')
  async setUser() {
    const { ctx } = this;
    const roleId = ctx.params.id;
    const { idList, type = 'set' } = ctx.request.body;

    const { users = [] } = await ctx.model.AuthGroup.findOne({
      _id: roleId,
    });

    let newUsers = [];
    if (type === 'add') {
      newUsers = union(users, idList);
    } else if (type === 'remove') {
      newUsers = difference(users, idList);
    } else {
      newUsers = idList;
    }

    const result = await ctx.model.AuthGroup.findByIdAndUpdate(roleId, {
      $set: {
        users: newUsers,
      },
    });

    if (result === null) {
      this.failure({
        data: {
          idList,
        },
        state: 404,
      });

      return false;
    }

    return this.success();
  }

 
  @get('/module/:id')
  async getModule() {
    const { ctx } = this;
    const query = ctx.params;

    const list =
      (
        await ctx.model.AuthGroup.findOne({
          _id: query.id,
        })
      ).modules || [];

    this.success({
      list,
    });
  }


  @put('/module/:id')
  async setModule() {
    const { ctx } = this;
    const roleId = ctx.params.id;
    const { idList } = ctx.request.body;

    // 给用户组集合插入user信息
    const result = await ctx.model.AuthGroup.findByIdAndUpdate(roleId, {
      $set: {
        modules: idList,
      },
    });

    if (result === null) {
      this.failure({
        data: {
          idList,
        },
        state: 404,
      });

      return false;
    }

    return this.success();
  }
}
