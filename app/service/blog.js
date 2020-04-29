// eslint-disable-next-line strict
const Service = require('egg').Service;
class BlogService extends Service {
  // implement
  async getAllArticle(postData) {
    let countSql = `select count(*) as total from blog_article where art_status ${postData.status ? `= ${postData.status}` : '<> 0'} `;
    let listSql = 'select * from blog_article LEFT JOIN blog_category ON blog_category.cat_id = blog_article.cat_id  where  1=1 ';
    if (postData.author) {
      countSql += `and blog_article.author=${escape(postData.author)}`;
      listSql += `and blog_article.author=${escape(postData.author)}`;
    }
    if (postData.keyword) {
      countSql += `and blog_article.art_title like ${escape(`%${postData.keyword}%`)} `;
      listSql += `and blog_article.art_title like ${escape(`%${postData.keyword}%`)} `;
    }
    if (postData.status) {
      listSql += ` and blog_article.art_status = ${postData.status} `;
    } else {
      listSql += 'and blog_article.art_status <> 0 ';
    }
    if (postData.categoryId) {
      countSql += ` and blog_article.cat_id = ${postData.categoryId} `;
      listSql += ` and blog_article.cat_id = ${postData.categoryId} `;
    }
    if (postData.tagId) {
      countSql += ` and blog_article.tag_ids like '%${postData.tagId}%' `;
      listSql += ` and blog_article.tag_ids like '%${postData.tagId}%' `;
    }
    listSql += 'order by blog_article.create_time desc ';
    listSql += `limit ${(postData.page - 1) * postData.pageSize},${postData.pageSize}; `;
    // console.log(listSql)
    const blogData = await this.app.mysql.query(listSql);
    const blogTotalData = await this.app.mysql.query(countSql);
    const total = blogTotalData[0].total;
    const lastPage = Math.ceil(total / postData.pageSize);
    const isLastPage = lastPage === postData.page;
    return { total, lastPage, isLastPage, blogData };
  }
  async getAllCategory(type) {
    type = Number(type);
    const categoryData = await this.app.mysql.query(`select a.cat_id,a.cat_name,b.counts from blog_category a left join (select cat_id,counts from(select cat_id,count(*) as counts from blog_article group by cat_id)tmp) b on a.cat_id=b.cat_id ${Number(type) ? `where a.cat_type=${type}` : ''} order by counts DESC; `);
    return categoryData;
  }
  async getAllTag(type) {
    const tagData = await this.app.mysql.query(`select * from blog_tag ${Number(type) ? `where tag_type=${type}` : ''}`);
    return tagData;
  }
  async getArticleDetail(id) {
    const tagData = await this.app.mysql.query(`select * from blog_article where art_id=${id}`);
    return tagData;
  }
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
