import { Context, controller, inject, provide, post, get, put, plugin, config } from 'midway';
import baseController from "../core/baseController";
import { IService } from '@/interface/authUserService';
import { pick } from 'underscore';
import { Jwt } from '@waiting/egg-jwt'
import { union} from 'lodash'

const crypto = require('crypto'); // build-in

@provide()
@controller('/admin/passport')
export class PassportController extends baseController {

  @inject()
  ctx: Context;

  @plugin()
  jwt: Jwt;

  @config('jwt')
  jwtConfig: any;

  
  @post('/login')
  async login() {
    const { ctx, jwtConfig, jwt } = this;
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
      // jwt
      const token = jwt.sign(info, jwtConfig.client.secret, { expiresIn: '12h' });
      this.success({
        ...info,
        token,
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
    // const { ctx } = this;
    // const { user } = ctx.state
    // if (!user) {
    //   return this.failure({})
    // }
    this.success();
  }

   
  // 获取自己的module
  @get('/module')
  async getModule() {
    const { ctx } = this;
    const { state } = ctx;
    let userGroupData = await ctx.model.AuthGroup.find(
      {
        users: state.user.id,
      },
      {
        modules: 1,
      },
    );

    userGroupData = userGroupData.map((item: any) => item.toJSON().modules);

    const userAuthModule: any[] = await ctx.model.AuthModule.find({
      _id: { $in: union(...userGroupData) }
    });

    this.success(userAuthModule)
  }


  @inject('AuthUserService')
  service: IService;
  @get('/auth')
  async auth() {
    const { ctx, service } = this;
    // if (!ctx.isAuthenticated()) {
    //   this.failure({
    //     data: ctx.user,
    //     state: 401,
    //   });
    //   return false;
    // }
    const result = await service.auth(ctx.user.id);
    return this.success(result);
  }

  @put(
    '/:id', 
    // { routerName: 'admin.passport.update', middleware: ['authMiddleware']}
  )
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
