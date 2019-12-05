'use strict';

class PaperFormConnector {
  constructor(ctx) {
    this.ctx = ctx
  }

  async getPaperFormList(params) {
    // 获取 ioc 容器中的对象
    // 注意，这里必须实时拿取 userService 实例，每个请求周期的实例都不同
    // const userService = await this.requestContext.getAsync('userService');
    // const data = await userService.getUserList();
    console.log('getPaperFormList', params.pageSize)
    return {
      success: true,
      message: 'get service data ' + JSON.stringify({
        a: 1
      }),
      data: { id: '1' },
    };
  }

  async createPaperForm(params) {
    console.log('createPaperForm', params.name)
    return {
      success: true,
      message: 'ok',
      
    };
  }
}

module.exports = PaperFormConnector