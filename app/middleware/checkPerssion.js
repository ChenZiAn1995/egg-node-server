const { SuccessModel, ErrorModel } = require('../model/resModel');
module.exports = options => {
  return async function checkPerssion(ctx, next) {
    // TODO 验证角色是否拥有权限 中间件确认角色权限,可以使用redis存放数据对象,避免每次都查询数据库获取
    await next();
    // const user_id = ctx.decode.user_id
    // try {
    //   // 解码token
    //   ctx.decode = ctx.app.jwt.verify(token, options.secret);
    //   await next();
    // } catch (error) {
    //   ctx.body = new ErrorModel({}, '登录已过期,请重新登录', 1006);
    //   return;
    // }
  };
};
