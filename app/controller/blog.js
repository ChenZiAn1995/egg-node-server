const { SuccessModel, ErrorModel } = require('../model/resModel');
const Controller = require('egg').Controller;
class BlogController extends Controller {
  async selective() {
    const param = this.ctx.params;
    const data = await this.service.blog.getAllArticle(param);
    this.ctx.body = new SuccessModel(data);
  }
  async getAllClassify() {
    const param = this.ctx.params;
    let data;
    if (param.select === 'category') {
      data = await this.service.blog.getAllCategory(param.type);
    } else if (param.select === 'tag') {
      data = await this.service.blog.getAllTag(param.type);
    } else if (param.select === 'all') {
      const categoryData = await this.service.blog.getAllCategory(param.type);
      const tagData = await this.service.blog.getAllTag(param.type);
      data = { categoryData, tagData };
    }
    this.ctx.body = new SuccessModel(data);
  }
  async getArticleDetail() {
    const id = this.ctx.params.artId;
    const data = await this.service.blog.getArticleDetail(id);
    this.ctx.body = data.length ? new SuccessModel(data) : new ErrorModel(data, '未找到该文章');
  }
}

module.exports = BlogController;
