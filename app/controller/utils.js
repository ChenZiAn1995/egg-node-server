const { SuccessModel, ErrorModel } = require('../model/resModel');
const Controller = require('egg').Controller;
class UtilsController extends Controller {

  // 根据token获取用户信息
  async getUserInfo() {
    const data = await this.service.utils.getRole(this.ctx.decode.roleId);
    const userInfo = await this.service.user.getUserInfo(this.ctx.decode.userId);
    this.ctx.body = new SuccessModel({ userName: userInfo.userName, roleName: userInfo.roleName, roles: data });
  }

  // 获取七牛token
  async getQiniuToken() {
    const token = await this.service.utils.getQiniuToken();
    if (token) {
      this.ctx.body = new SuccessModel({ token });
    } else {
      this.ctx.body = new ErrorModel();
    }
  }
}

module.exports = UtilsController;
