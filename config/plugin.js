'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 暂时不引入,后期学习重构时加入. 体系较为庞杂
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize',
  // },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
