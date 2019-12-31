import { provide, inject } from 'midway';
import { IService, IListReq, IListResult, IModuleList } from '@/interface/authUserService';
import IContext from '@/interface/context';
import { IAuthUser } from '@/interface/model';
import { ISuccessRes } from '@/interface/response';
import { union } from 'underscore';
const crypto = require('crypto'); // build-in

@provide('AuthUserService')
export class AuthUserService implements IService {
  
  @inject()
  ctx: IContext;

  /**
   * @param  {IListReq} query
   * @returns Promise
   */
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

  /**
   * @param  {IAuthUser} query
   * @returns Promise
   */
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

  
  /**
   * @param  {string} id
   * @returns Promise
   */
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

  /**
   * @param  {string} id
   * @returns Promise
   */
  async detail(id: string): Promise<IAuthUser> {
    const result = await this.ctx.model.AuthUser.findOne({
      _id: id,
    });

    return result;
  }


  async update(id: string, data: any): Promise<IAuthUser> {
    let newData = Object.assign(data, { _id: id });

    if (data.password) {
      newData = Object.assign(newData, {
        password: crypto
          .createHash('md5')
          .update(data.password)
          .digest('hex'),
      });
    }

    return await this.ctx.model.AuthUser.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    }).exec();
    
  }

  async auth(id: string): Promise<IModuleList> {
    const { ctx } = this;
      let userGroupData = await ctx.model.AuthGroup.find(
        {
          users: id,
        },
        {
          modules: 1,
        },
      );
      userGroupData = userGroupData.map((item: any) => item.toJSON().modules);
      const ids = union(...userGroupData)
      const result = await ctx.model.AuthModule.find({
        $query: (obj: any) => ids.includes(obj._id)
      });

      return result;
  }

}