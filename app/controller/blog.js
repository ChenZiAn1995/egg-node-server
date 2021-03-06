const { SuccessModel, ErrorModel } = require('../model/resModel');

const Controller = require('egg').Controller;
class BlogController extends Controller {
  // 根据条件查询文章
  async selective() {
    const param = this.ctx.params;
    const data = await this.service.blog.getArticleList(param);
    this.ctx.body = new SuccessModel(data);
  }
  // 获取所有分类
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
  // 获取文章详情
  async getArticleDetail() {
    const id = this.ctx.params.artId;
    const data = await this.service.blog.getArticleDetail(id);
    this.ctx.body = data.length ? new SuccessModel(data[0]) : new ErrorModel(data, '未找到该文章');
  }
  // 新增或更新文章
  async addOrUpdateArt() {
    const result = await this.service.blog.addOrUpdateArt(this.ctx.params, this.ctx.decode);
    this.ctx.body = result ? new SuccessModel() : new ErrorModel();
  }
  // 修改文章状态
  async changeArtStatus() {
    const result = await this.service.blog.changeType(this.ctx.params, 'article', 'artStatus', 'artId');
    this.ctx.body = result ? new SuccessModel() : new ErrorModel();
  }
  // 修改分类状态
  async changeCatStatus() {
    const result = await this.service.blog.changeType(this.ctx.params, 'category', 'catStatus', 'catId');
    this.ctx.body = result ? new SuccessModel() : new ErrorModel();
  }

  // 新增/ 删除分类或标签
  async addOrUpdateCategoryAndTag () {
    let type = this.ctx.params.type
    if (type === 'tag') {
      const result =await this.service.blog.setCategory(this.ctx.params);
    }else if (type === 'cat') {
      const result =await this.service.blog.setTag(this.ctx.params);
    }
    this.ctx.body = result ? new SuccessModel() : new ErrorModel();
  }
  // async updateArticleType() {
  //
  // }
}

module.exports = BlogController;
