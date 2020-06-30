/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 配置 sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    password: '335544//mysql',
    port: 3306,
    database: 'egg-node-blog',
  };


  // 配置mysql 此处修改mysql的配置
  config.mysql = {
    // database configuration
    client: {
      // host 地址
      host: 'localhost',
      // port 端口
      port: '3306',
      // username 用户名
      user: 'root',
      // password 密码
      password: '335544//mysql',
      // database 数据库名称
      database: 'blog',
    },
    // load into app,default is open //加载到应用程序，默认为打开
    app: true,
    // load into agent,default is close //加载到代理中，默认值为“关闭”
    agent: false,
  };

  // use for cookie sign key, should change to your own and keep security
  // 存放于cookie的密钥, 为保证安全最好修改密钥
  config.keys = appInfo.name + '_1588062264837_7322';

  // JWT安全密钥
  config.jwt = {
    secret: 'flsh#Nb', // 自定义 token 的加密条件字符串
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 允许访问接口的白名单
  };

  // JWT 跨域设置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST', // HEAD,PUT,DELETE,PATCH  没做restFul风格api 需要的自行添加即可
  };


  // add your middleware config here
  // 此处添加中间件名称
  config.middleware = [
    'param',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
