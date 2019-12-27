import { Context, controller, inject, provide, get, post, del, put } from 'midway';
import baseController from "../core/baseController";
import { IService } from '@/interface/authModuleService'
import { pick } from 'underscore';

@provide()
@controller('/admin/module')
export class authModuleController extends baseController {

  @inject()
  ctx: Context;

  @inject('AuthModuleService')
  service: IService
  
  /*
  * 获取所有的 module
  */
  @get('/')
  async list() {
    
    const result = await this.service.list();

    this.success({
      list: result
    })
  }

  @post('/')
  async create() {
    const query = this.ctx.request.body;

    const createRule = {
      name: {
        type: 'string',
        required: true,
      },
      uri: {
        type: 'string',
        required: true,
      },
      sort: {
        type: 'number',
        required: false,
        allowEmpty: true,
      },
      parent_id: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
      describe: {
        type: 'string',
        required: false,
        allowEmpty: true,
      }
    };

    try {
      this.ctx.validate(createRule);
    } catch (err) {

      this.validateError(err);

      return;
    }

    if (query.uri) {
      const isExist = await this.ctx.model.AuthModule.findOne({
        uri: query.uri,
      });
      if (isExist) {
        this.failure({
          code: '-1',
          msg: 'uri已存在',
          data: {
            uri: query.uri,
          },
          state: 422,
        });
        return false;
      }
    }

    const result = await this.service.create({
      name: '',
      ...pick(query, ...Object.keys(createRule))
    });
    this.success(result);

  }

  @del('/:id')
  async destroy() {
    const {id, uri} = this.ctx.params;
  
    const isExist = await this.ctx.model.AuthModule.findOne({
      _id: id,
    });
    if (!isExist) {

      this.failure({
        code: '-1',
        msg: 'id不存在',
        data: {
          uri,
        },
      });

      return false;
    }

    await this.service.destroy(id);

    this.success({
      uri,
    });
  }


  @get('/:id')
  async detail() {
    const { id } = this.ctx.params;

    const result = await this.service.detail(id);
    
    this.success(pick(
      result,
      '_id',
      'name',
      'uri',
      'sort',
      'parent_id',
      'describe'
    ));
  }

  @put('/:id')
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const query = ctx.request.body;

    const createRule = {
      name: {
        type: 'string',
        required: true,
      },
      uri: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
      describe: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
      sort: {
        type: 'number',
        required: false,
        allowEmpty: true,
      },
      parent_id: {
        type: 'string',
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

    const isUriExist = await this.ctx.model.AuthModule.findOne({
      _id: {
        $ne: id,
      },
      uri: query.uri,
    });
    if (isUriExist) {
      this.failure({
        code: '-1',
        msg: 'uri已存在',
        data: {
          uri: query.uri,
        },
        state: 422,
      });
      return false;
    }

    const result = await service.update(
      id,
      {
        name: '',
        ...pick(query, ...Object.keys(createRule))
      }
    );
    this.success(result);
  }

}
