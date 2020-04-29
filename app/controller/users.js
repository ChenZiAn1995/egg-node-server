const { SuccessModel, ErrorModel } = require('../model/resModel');
const Controller = require('egg').Controller;
class UserController extends Controller {
  async login() {
    const param = this.ctx.params;
    const data = await this.service.blog.getAllArticle(param);
    this.ctx.body = new SuccessModel(data);
  }
}

module.exports = UserController;
