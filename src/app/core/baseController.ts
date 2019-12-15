import { Context, inject } from 'midway';

export default class BaseController {
  @inject()
  ctx: Context;

  success(data: any = {}, state?: number) {
    const { ctx } = this;
    ctx.body = {
      code: '0',
      msg: 'OK',
      result: data,
    };
    ctx.status = state || 200;
  }

  failure({ state, data, code, msg }: any) {
    const { ctx } = this;
    const defaultCode = (state >= 200 && state < 300) ? 0 : state;

    ctx.body = {
      code: String(code || defaultCode),
      msg: msg || ctx.helper.errorCode[String(state)],
      result: data,
    };
    ctx.status = state || 500;
  }

  validateError(err: any) {
    const ctx = this.ctx;

    ctx.body = {
      code: '422',
      msg: ctx.helper.errorCode['422'],
      result: err.errors,
    };
    ctx.status = 200;
  }
}

