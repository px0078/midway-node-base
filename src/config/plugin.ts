export default {
  static: false, // default is true

  // 表单验证
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  passport: {
    enable: true,
    package: 'egg-passport',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // redis: {
  //   enable: true,
  //   package: 'egg-redis',
  // },

  // sessionRedis: {
  //   enable: true,
  //   package: 'egg-session-redis',
  // }

};
