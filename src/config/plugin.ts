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

  redis: {
    enable: true,
    package: 'egg-redis',
  },

  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  }

};
