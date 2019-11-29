export default {
  static: false, // default is true

  passport: {
    enable: true,
    package: 'egg-passport',
  },

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
  }

};
