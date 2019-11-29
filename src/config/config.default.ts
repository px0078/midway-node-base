import { Context } from 'midway'

export default (appInfo: any) => {
  const config: any = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574519964458_8021';

  // add your config here
  config.middleware = [
    'graphql'
  ];

  config.security = {
    csrf: false,
  }
  
  // mongoose
  config.mongoose = {
    clients: {
      back: {
        url: 'mongodb://127.0.0.1:27017/pyedu',
        options: {
          useUnifiedTopology: true
        },
      },
    },
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: 'auth',
      db: 0,
    },
  }

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    onPreGraphQL: async (ctx: Context) => {},
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    onPreGraphiQL: async (ctx: Context) => {},
  };

  return config;
};
