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
  config.mysql={
    //database configuration
    client:{
      //host
      host:'localhost',
      //port
      port:'3306',
      //username
      user:'root',
      //password
      password:'335544//mysql',
      //database
      database:'_blog'
    },
    //load into app,default is open //加载到应用程序，默认为打开
    app:true,
    //load into agent,default is close //加载到代理中，默认值为“关闭”
    agent:false,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588062264837_7322';

  // 测试环境下关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your middleware config here
  config.middleware = [
    'param'
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
