import { Context, controller, inject, get, provide } from 'midway';

@provide()
@controller('/common')
export class CommonController {

  @inject()
  ctx: Context;

  @get('/')
  async index() {
    this.ctx.body = `hello world!`;
  }
}
