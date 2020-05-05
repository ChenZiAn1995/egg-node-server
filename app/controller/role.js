const { SuccessModel, ErrorModel } = require('../model/resModel');
const Controller = require('egg').Controller;
class RoleController extends Controller {

  // 根据token获取用户信息
  async getUserInfo() {
    const data = await this.service.role.getRole(this.ctx.decode.role_id);
    this.ctx.body = new SuccessModel({ roles: data });
  }
}

module.exports = RoleController;
