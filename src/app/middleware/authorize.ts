import { Middleware, WebMiddleware, provide } from 'midway'
import { uniq, compact, flatten } from 'underscore';


@provide()
export class authMiddleware implements WebMiddleware {

  public resolve(): Middleware {
    return async (ctx, next) => {
      const action = ctx.routerName;
      const isLogin = ctx.isAuthenticated();
      const userInfo = ctx.user;
      const noAccess = () => {
        ctx.body = {
          code: '403',
          msg: ctx.helper.errorCode['403'],
          result: {
            userId: userInfo,
            uri: action,
          },
        };
        ctx.status = 403;
      };
  
      if (!isLogin) {
        if (ctx.acceptJSON) {
          ctx.body = {
            code: '401',
            msg: ctx.helper.errorCode['401'],
            result: {
              userId: userInfo,
              uri: action,
            },
          };
          ctx.status = 401;
        } else {
          ctx.redirect('/login?redirect=' + encodeURIComponent(ctx.originalUrl));
        }
        return false;
      }
  
      // 不传action时，只鉴权是否登陆
      if (!action) {
        await next();
        return true;
      }
  
      // 根据用户的 id 来查找用户所在组
      let groupModulesList = await ctx.model.AuthGroup.find(
        {
          users: userInfo.id,
        },
        {
          modules: 1,
        }
      );
      
      if (!groupModulesList) return noAccess()
      groupModulesList = flatten(groupModulesList)
  
      if (!groupModulesList.length) return noAccess();

      // 遍历用户的所有组
      // for (let i = 0, l = groupsList.length; i < l; i++) {
      //   const buttonGroup = groupsList[i].modules || [];
  
      //   // 如果用户所在组没有权限就返回
      //   if (buttonGroup.length === 0) return noAccess();
  
      // 查找用户所在组里所有的 uri
      const result = await ctx.model.AuthModule.find({ _id: { $in: groupModulesList } });

      // 查不到就返回无权限
      if (result === null || !result.length) return noAccess();
  
      let uri = result.map((item: any) => {
        if (item.uri && item.uri.trim()) {
          return item.uri.split(',');
        }
        return '';
      });
  
      uri = uniq(compact(flatten(uri)));

      // 找到了之后看该用户的用户组是否有此权限的id
      if (uri.includes(action)) {
        await next();
        return true;
      }
      // }
      noAccess();
    }
  }

}
