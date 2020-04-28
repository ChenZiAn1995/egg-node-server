const { SuccessModel, ErrorModel } = require('../model/resModel')
const Controller = require('egg').Controller;
class BlogController extends Controller {
  async index() {
    const param = this.ctx.params;
    const data = await this.service.blog.findAll(param);
    this.ctx.body = new SuccessModel(data);
  }
}

module.exports = BlogController;
