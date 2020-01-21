import { Context, controller, inject, get, provide } from 'midway';
import { intersection } from 'underscore';
import {
  IAuthUser,
  IAuthModule,
  IAuthGroup,
} from '@/interface/model';
import baseController from "../core/baseController";

@provide()
@controller('/admin/auth')
export class AuthController extends baseController {

  @inject()
  ctx: Context;

  /**
  * 权限分配，返回每个权限module对应的角色和用户数量
  */
  @get('/', { routerName: 'auth.assign', middleware: ['authMiddleware'] })
  async assign() {
    const { ctx } = this;
    const userIds = (await ctx.model.AuthUser.find()).map((u: IAuthUser) => u._id);
    const ids = (await ctx.model.AuthModule.find()).map((menu: IAuthModule) => menu._id);
    const groups = await ctx.model.AuthGroup.find();
    const assign: any = {};
    groups.forEach((group: IAuthGroup) => {
      const { modules } = group;

      ids.forEach((id: string) => {
        const isInclude = modules.includes(id);
        if (isInclude) {
          const item = assign[`${id}`] || {};
          const role = item.role || [];
          const user = item.user || [];

          item.role = [...role, group.name];
          item.user = [
            ...user,
            intersection(
              JSON.parse(JSON.stringify(group.users)),
              JSON.parse(JSON.stringify(userIds)),
            ),
          ];
          assign[`${id}`] = item;
        }
      });
    });
    this.success(assign);
  }


}
