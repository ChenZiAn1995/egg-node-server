const Service = require('egg').Service;
class BlogService extends Service {
  // implement
  async findAll(param) {
    const blogData = await this.app.mysql.select('blog_article', {
      where: { art_status: 1 },
    });
    const blogTotalData = await this.app.mysql.query('select count(*) as total from blog_article where art_status=?', [ 1 ]);
    const total = blogTotalData[0].total;
    return { total, blogData };
  }
  // async findOne(uid) {
  //   const user = await this.app.mysql.get('user', { user_id: uid });
  //   return { user };
  // }
  // async add(params) {
  //   const date = new Date();
  //   const result = await this.app.mysql.insert('user', { user_name: params.name, user_pwd: params.pwd, user_sex: params.sex, user_role: params.role, user_createdate: date });
  //   return { result };
  // }
  // async delete(uid) {
  //   const result = await this.app.mysql.delete('user', {
  //     user_id: uid,
  //   });
  //   return { result };
  // }
  // async update(params) {
  //   // 如果主键是自定义的 ID 名称，如 custom_id，则需要在 `where` 里面配置
  //   const options = {
  //     where: {
  //       user_id: params.id
  //     }
  //   };
  //   const row = {
  //     user_name: params.name,
  //     user_createdate: new Date(),
  //   };
  //   const result = await this.app.mysql.update('user', row, options);
  //   return { result };
  // }
}

module.exports = BlogService;
