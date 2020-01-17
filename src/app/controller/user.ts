import { Context, controller, inject, get, provide, post, del, put } from 'midway';
import { IService } from '@/interface/authUserService'
import { pick } from 'underscore';
import baseController from "../core/baseController";
import { IAuthUser, IAuthGroup } from '@/interface/model'

@provide()
@controller('/admin/user')
export class UserController extends baseController {

  @inject()
  ctx: Context;

  @inject('AuthUserService')
  service: IService

  @get('/')
  async list() {
    const { ctx, service } = this;
    const { query } = ctx.request;
    const { pageNumber = 1, pageSize = 10 } = query
    // 获取传参中指定的key，且过滤掉为`空`的条件。
    const where = pick(
      pick(query, ...['account', 'name', 'mobile', 'email']),
      value => value !== '' && value !== undefined,
    );

    const result = await service.list({
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      ...where
    });
    this.success({
      ...result,
      list: result.list.map((obj: IAuthUser) => pick(obj, 
        '_id', 'name', 'account', 'status', 'gender'
      )),
    });
  }

  @get('/info')
  async userInfo() {
    const { ctx } = this;
    // if (!ctx.isAuthenticated()) {
    //   this.failure({
    //     code: '401',
    //     msg: ctx.helper.errorCode['401'],
    //     data: ctx.user,
    //     state: 401,
    //   });
    //   return;
    // }
    const result = (
      await ctx.model.AuthUser.findOne(
        {
          _id: ctx.user.id,
        },
        {
          account: 1,
          gender: 1,
          remark: 1,
          name: 1,
          email: 1,
          mobile: 1,
          avatar: 1,
        },
      )
    ).toJSON();

    this.success({
      ...result,
      id: ctx.user.id,
      roles: ctx.user.roles,
    });
  }

  @get('/users')
  async getUserById() {
    const { ctx, service } = this;
    let { searchType = 1, searchKey = '' } = ctx.request.body;
    const { ids = [], pageNumber = 1, pageSize = 10 } = ctx.request.body;
    searchType = Number(searchType);
    searchKey = searchKey.trim();
    const queryParms: any = {};
    if (ids.length > 0) {
      queryParms._id = { $in: ids }
    }
    if (searchKey) {
      const reg = new RegExp(searchKey, 'i');
      if (searchType === 1) queryParms.name = { $regex: reg };
      if (searchType === 2) queryParms.account = { $regex: reg };
    }
    const { list, total } = await service.list({pageNumber, pageSize, ...queryParms});
    this.success({
      list: list.map(i => pick(i, '_id', 'name', 'account',)),
      total,
    });
  }

  @get('/:id/auth')
  async authorization() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const result = await service.auth(id);

    this.success(result);
  }


  @post('/')
  async create() {
    const { ctx, service } = this;
    const query = ctx.request.body;

    const createRule = {
      account: {
        type: 'string',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
    };

    try {
      ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);

      return;
    }

    const isAccountExist = await this.ctx.model.AuthUser.findOne({
      account: query.account,
    });

    if (isAccountExist) {
      this.failure({
        code: '-1',
        msg: '用户名已存在',
        data: {
          account: query.account,
        },
        state: 422,
      });

      return false;
    }

    const result = await service.create(
      {
        name: '',
        account: '',
        password: '',
        status: 0,
        ...pick(query, ...Object.keys(createRule))
      }
    );
    if (result) {
      this.success(pick(result, 'name', 'account', '_id', 'status'));
    } else {
      this.failure({})
    }
  }

  @del('/:id')
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;

    const result = await service.destroy(id);

    if (!result) {
      this.failure({
        data: {
          id,
        },
        state: 404,
      });

      return false;
    }

    return this.success();
  }

  @get(
    '/:id',
  )
  async detail() {
    const { ctx, service } = this;
    const { id } = ctx.params;

    const userInfo = await service.detail(id);

    if (!userInfo) {
      this.failure({
        data: {
          id,
        },
        state: 404,
      });
      return false;
    }

    // 再查下他的 roles
    const groupNameList = await this.ctx.model.AuthGroup.find(
      {
        users: id,
      },
      {
        name: 1,
      },
    );
    const roles = groupNameList.map((item: IAuthGroup) => item.name);
    const result = {
      roles,
      ...pick(userInfo, '_id', 'account', 'avatar', 'createDate', 'email', 'gender', 'mobile', 'name', 'remark', 'status'),
    };
    this.success(result)
  }

  @put('/:id')
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const query = ctx.request.body;

    const createRule = {
      remark: {
        type: 'string',
        required: false,
      },
      name: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        required: false,
      },
      mobile: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
      email: {
        type: 'email',
        required: false,
        allowEmpty: true,
      },
    };

    try {
      ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);
      return;
    }
    const result = await service.update(
      id,
      pick(query, ...Object.keys(createRule)),
    );
    if (!result) {
      this.failure({
        data: {
          id,
        },
        state: 404,
      });
      return;
    }
    this.success();
  }

  
  @put('/:id/password')
  async setPassword() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const query = ctx.request.body;

    const createRule = {
      password: {
        type: 'string',
        required: true,
      },
    };
    try {
      ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);
      return;
    }
    const result = await service.update(
      id,
      pick(query, ...Object.keys(createRule)),
    );
    if (!result) {
      this.failure({
        data: {
          id,
        },
        state: 404,
      });
      return;
    }
    this.success();
  }


}
