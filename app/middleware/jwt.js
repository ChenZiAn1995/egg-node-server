const { SuccessModel, ErrorModel } = require('../model/resModel');
module.exports = options => {
  return async function jwt(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = new ErrorModel('请登录后再试');
      return;
    }
    const token = ctx.request.header.authorization.split(' ')[1];
    try {
      // 解码token
      ctx.decode = ctx.app.jwt.verify(token, options.secret);
      await next();
    } catch (error) {
      ctx.body = new ErrorModel({}, '登录已过期,请重新登录', 1006);
      return;
    }

  };
};
