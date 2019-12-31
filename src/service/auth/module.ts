import { provide, inject } from 'midway';
import { IService, IListResult } from '@/interface/authModuleService';
import IContext from '@/interface/context'
import { ISuccessRes, IFailureRes } from '@/interface/response'
import { IAuthModule } from '@/interface/model';

@provide('AuthModuleService')
export class AuthModuleService implements IService {
  
  @inject()
  ctx: IContext;

  /**
   * @returns Promise
   */
  async list(): Promise<IListResult> {
    return await this.ctx.model.AuthModule.find({})
  }
  
  /**
   * @param  {IAuthModule} data
   * @returns Promise
   */
  async create(data: IAuthModule): Promise<ISuccessRes> {
    return await this.ctx.model.AuthModule.create(data)
  }
  
  /**
   * @param  {string} id
   * @returns Promise
   */
  async destroy(id: string): Promise<ISuccessRes> {

    const result = await this.ctx.model.AuthModule.deleteOne({
      _id: id,
    });

    // 删除用户组集合中与此模块相关的数据
    // 不加 await 该语句或不会执行
    await this.ctx.model.AuthGroup.update({},
      {
        $pull: { modules: { $in: [id]} },
      }, {
        upsert: false,
        multi: true,
      }
    );

    return result;
  }

  /**
   * @param  {string} id
   * @returns Promise
   */
  async detail(id: string): Promise<IAuthModule> {
    const result = await this.ctx.model.AuthModule.findOne({
      _id: id,
    });
    return result;
  }

  /**
   * @param  {string} id
   * @param  {IAuthModule} data
   * @returns Promise
   */
  async update(id: string, data: IAuthModule): Promise<ISuccessRes | IFailureRes> {
    try {
      return await this.ctx.model.AuthModule.findByIdAndUpdate(id, {
        ...data,
        parent_id: data.parent_id || '',
      }, {
        new: true,
        runValidators: true,
      }).exec();
    } catch (err) {
      this.ctx.logger.error(err.message);
      return {
        code: 1,
        msg: err.message
      };
    }
  }

}
