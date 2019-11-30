export default {
  static: false, // default is true

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  graphql: {
    enable: true,
    package: 'egg-graphql',
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
