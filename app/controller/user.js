const { SuccessModel, ErrorModel } = require('../model/resModel');
const Controller = require('egg').Controller;
class UserController extends Controller {
  // 登录
  async login() {
    const data = await this.service.user.login(this.ctx.params);
    if (data.length > 0) {
      const token = this.app.jwt.sign({
        userId: data[0].id,
        roleId: data[0].roleId,
      }, this.app.config.jwt.secret, { expiresIn: 3600 });
      const roles = await this.service.utils.getRole(data[0].roleId, 1);
      this.ctx.body = new SuccessModel({ token, userName: data[0].userName, roleName: data[0].roleName, roles });
    } else {
      this.ctx.body = new ErrorModel('登录失败,请检查用户名或密码是否错误');
    }
  }
  // 修改密码
  async changePassword() {
    const validate = await this.service.user.changePassword(this.ctx.params);
    if (!validate) {
      this.ctx.body = new ErrorModel('修改失败,请检查密码输入是否正确');
    } else if (validate === 1) {
      this.ctx.body = new ErrorModel('修改失败,请稍后再试');
    } else if (validate === 2) {
      this.ctx.body = new SuccessModel({}, '修改成功,请重新登录', 1002);
    }
  }

  // 退出并清除用户信息 TODO 清除redis缓存
  async logout() {
    this.ctx.body = new SuccessModel({}, '退出成功', 1002);
  }
}

module.exports = UserController;
