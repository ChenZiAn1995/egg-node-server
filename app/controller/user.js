const { SuccessModel, ErrorModel } = require('../model/resModel');
const Controller = require('egg').Controller;
class UserController extends Controller {
  async login() {
    const data = await this.service.user.login(this.ctx.params);

    if (data.length > 0) {
      const token = this.app.jwt.sign({
        user_id: data[0].user_id,
        role_id: data[0].role_id,
      }, this.app.config.jwt.secret, { expiresIn: 3600 });
      this.ctx.body = new SuccessModel({ token, role_name: data[0].role_name });
    } else {
      this.ctx.body = new ErrorModel('登录失败,请检查用户名或密码是否错误');
    }
  }
  async changePassword() {
    const validate = await this.service.user.changePassword(this.ctx.params);
    if (!validate) {
      this.ctx.body = new ErrorModel('修改失败,请检查密码输入是否正确');
    } else if (validate === 1) {
      this.ctx.body = new ErrorModel('修改失败,请稍后再试');
    } else if (validate === 2) {
      this.ctx.body = new SuccessModel({}, '修改成功,请重新登录', 1001);
    }
  }
}

module.exports = UserController;
