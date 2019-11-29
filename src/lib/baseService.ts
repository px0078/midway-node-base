import { plugin } from 'midway'


export class baseService {

  @plugin()
  redis: any;
  async setRedis(name: string, value: any) {
    this.redis.set(name, value)
  }

  async getRedis(name: string): Promise<any> {
    return this.redis.get(name)

  }
 

}