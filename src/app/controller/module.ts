import { Context, controller, inject, provide, get, post } from 'midway';
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

}
