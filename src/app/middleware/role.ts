
import * as _ from 'underscore';
import { Context } from 'midway'

export default (action: String) => {
  return async function(ctx: Context, next: any) {
    const isLogin = ctx.sesstion
    const noAccess = () => {
      ctx.body = {
        code: '403',
        msg: ctx.helper.errorCode['403'],
      };
      ctx.status = 403;
    };
    const needLogin = () => {
      ctx.body = {
        code: '401',
        msg: ctx.helper.errorCode['401'],
      };
      ctx.status = 401;
    }
    
    // 未登录返回
    if (!isLogin) {
      needLogin()
      return false
    }

    // 不传action时，只鉴权是否登陆
    if (!action) {
      await next();
      return true;
    }
    // 登录获取信息
    const userInfo = JSON.parse(isLogin)

    // 根据用户的 id 来查找用户所在组
    const groupsList = await ctx.model.AuthGroup.find({
      users: userInfo.id,
    });

    if (groupsList === null || !groupsList.length) {
      noAccess();
    }

    // 遍历用户的所有组
    for (let i = 0, l = groupsList.length; i < l; i++) {
      const buttonGroup = groupsList[i].modules || [];

      // 如果用户所在组没有权限就返回
      if (buttonGroup.length === 0) return noAccess();

      // 查找用户所在组里所有的 uri
      const result = await ctx.model.AuthModule.find({ _id: { $in: buttonGroup } });

      // 查不到就返回无权限
      if (result === null || !result.length) return noAccess();

      let uri = result.map((item: any) => {
        if (item.uri && item.uri.trim()) {
          return item.uri.split(',');
        }
        return '';
      });

      uri = _.uniq(_.compact(_.flatten(uri)));

      // 找到了之后看该用户的用户组是否有此权限的id
      if (uri.includes(action)) {
        await next();

        return true;
      }
    }
    noAccess();

  }
}

