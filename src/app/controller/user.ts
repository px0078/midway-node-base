import { Context, controller, inject, get, provide, post, del } from 'midway';
import { IService } from '@/interface/authUserService'
import { pick } from 'underscore';
import baseController from "../core/baseController";
import { IAuthUser } from '@/interface/model'

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

}
