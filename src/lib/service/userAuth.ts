
import { provide } from 'midway'
import { IUserInfo } from '../../interface';
import { baseService } from '../baseService';

@provide('userAuthService')
export class userAuth extends baseService {

  async login(): Promise<IUserInfo> {
    // const info = {
    //   id: 1,
    //   name: '123'
    // }
    // this.setRedis('px', info)
    return  this.getRedis('px')
  }

}