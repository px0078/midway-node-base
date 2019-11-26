export default (appInfo: any) => {
  const config: any = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574519964458_8021';

  // add your config here
  config.middleware = [
  ];
  
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

  return config;
};
