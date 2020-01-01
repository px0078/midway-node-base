import { Context, controller, inject, provide, post, get, put } from 'midway';
import baseController from "../core/baseController";
import { IService } from '@/interface/authUserService';
import { pick } from 'underscore';
const crypto = require('crypto'); // build-in

@provide()
@controller('/admin/passport')
export class PassportController extends baseController {

  @inject()
  ctx: Context;
  
  @post('/login')
  async login() {
    const { ctx } = this;
    const { account, password } = ctx.request.body;
    const createRule = {
      account: {
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
    const userInfo = await ctx.model.AuthUser.findOne({
      account,
      password: crypto
        .createHash('md5')
        .update(password)
        .digest('hex'),
    });

    if (userInfo) {
      const groupNameList = await ctx.model.AuthGroup.find(
        {
          users: userInfo.id,
        },
        {
          name: 1,
        }
      );
      const roles = groupNameList.map((item: any) => item.name);
      const info = {
        id: userInfo.id,
        account: userInfo.account,
        name: userInfo.name,
        roles,
      };
      ctx.login(info);
      this.success({
        id: userInfo._id,
        userName: userInfo.name,
        roles,
      });
    } else {
      this.failure({
        code: '1',
        data: {},
        msg: '账号或密码错误',
        state: 200,
      });
    }
  }

  @post('/logout')
  async logout() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) ctx.logout();
    this.success();
  }


  @inject('AuthUserService')
  service: IService;
  @get('/auth')
  async auth() {
    const { ctx, service } = this;
    if (!ctx.isAuthenticated()) {
      this.failure({
        data: ctx.user,
        state: 401,
      });
      return false;
    }
    const result = await service.auth(ctx.user.id);
    return this.success(result);
  }

  @put('/:id')
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const query = ctx.request.body;

    const createRule = {
      gender: {
        type: 'string',
        required: false,
      },
      name: {
        type: 'string',
        required: false,
      },
      avatar: {
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
 

}