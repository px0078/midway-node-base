import { Context, controller, inject, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @inject('userAuthService')
  service: any;

  @get('/')
  async index() {
    console.log('px', await this.service.login())
    this.ctx.body = `hello world!`;
  }
}
