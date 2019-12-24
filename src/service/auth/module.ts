import { provide, inject } from 'midway';
import { IService, IListResult } from '@/interface/authModuleService';
import IContext from '@/interface/context'
import { ISuccessRes } from '@/interface/response'
import { IAuthModule } from '@/interface/model';

@provide('AuthModuleService')
export class AuthModuleService implements IService {
  
  @inject()
  ctx: IContext;

  async list(): Promise<IListResult> {
    return await this.ctx.model.AuthModule.find({})
  }
  
  async create(data: IAuthModule): Promise<ISuccessRes> {
    return await this.ctx.model.AuthModule.create(data)
  }

}
