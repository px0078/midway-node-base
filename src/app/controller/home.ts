import { Context, controller, inject, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  /**
   * helloword
   */
  @get('/')
  async index() {
    this.ctx.body = `hello world!`;
  }
}
