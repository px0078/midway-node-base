
export default (appInfo: any) => {
  const config: any = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574519964458_80210';

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

  return config;
};
