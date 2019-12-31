import { provide, inject } from 'midway';
import { IService, IListReq, IListResult } from '@/interface/authUserService';
import IContext from '@/interface/context';
import { IAuthUser } from '@/interface/model';
import { ISuccessRes } from '@/interface/response';
const crypto = require('crypto'); // build-in

@provide('AuthUserService')
export class AuthUserService implements IService {
  
  @inject()
  ctx: IContext;

  async list(query: IListReq): Promise<IListResult> {
    const { pageNumber, pageSize, ...where } = query;
    const results = await this.ctx.model.AuthUser.find(where)
      .skip((pageNumber - 1) * pageSize)
      .sort({ _id: -1 })
      .limit(Number(pageSize))
      .exec();
    return this.ctx.response.format.paging({
      results,
      total: await this.ctx.model.AuthUser.find(where).countDocuments(),
      pageSize,
      pageNumber: Number(pageNumber),
    });
  }

  async create(query: IAuthUser): Promise<IAuthUser> {
    const result = await this.ctx.model.AuthUser.create(
      Object.assign(query, {
        password: crypto
          .createHash('md5')
          .update(query.password)
          .digest('hex'),
      }),
    );
    return result;
  }

  async destroy(id: string): Promise<ISuccessRes> {
    const result = await this.ctx.model.AuthUser.deleteOne({
      _id: id,
    });

    // 删除用户组集合中与此模块相关的数据
    // 不加 await 该语句或不会执行
    await this.ctx.model.AuthGroup.update({},
      {
        $pull: { users: { $in: [id]} },
      }, {
        upsert: false,
        multi: true,
      }
    );

    return result
  }

}