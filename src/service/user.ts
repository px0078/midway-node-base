import { provide, inject, Context } from 'midway';
import { IUserService, IUserOptions, IUserResult } from '../interface';

@provide('userService')
export class UserService implements IUserService {

  @inject()
  ctx: Context;

  async getUser(options: IUserOptions): Promise<IUserResult> {
    // TODO: 拿不到 model
    console.log(';; ', this.ctx.model.AuthUser)
    return {
      id: options.id,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
