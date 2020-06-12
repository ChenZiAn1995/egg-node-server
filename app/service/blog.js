// eslint-disable-next-line strict
const Service = require('egg').Service;
class BlogService extends Service {
  // implement
  async getAllArticle(postData) {
    let countSql = `select count(*) as total from article where artStatus ${postData.status >= 0 && postData.status !== '' ? `= ${postData.status}` : '<> 0'} `;
    let listSql = 'select a.id as artId,a.artTitle,a.artDesc,a.artCover,a.artContent,a.catId,a.tagIds,a.createTime,a.updateTime,a.artStatus,a.authorId,a.artVisited,a.artComment,a.artLikes,c.catName,c.catStatus  from article as a LEFT JOIN category as c ON c.id = a.catId  where  1=1 ';
    if (postData.artId) {
      countSql += `and article.id=${escape(postData.artId)} `;
      listSql += `and a.id=${escape(postData.artId)} `;
    }
    if (postData.keyword) {
      countSql += `and article.artTitle like '%${postData.keyword}%' `;
      listSql += `and a.artTitle like '%${postData.keyword}%' `;
    }
    if (postData.status >= 0 && postData.status !== '') {
      listSql += ` and a.artStatus = ${postData.status} `;
    } else {
      listSql += 'and a.artStatus <> 0 ';
    }
    if (postData.categoryId) {
      countSql += ` and article.catId = '${postData.categoryId}' `;
      listSql += ` and a.catId = '${postData.categoryId}' `;
    }
    if (postData.tagId) {
      countSql += ` and article.tagIds like '%${postData.tagId}%' `;
      listSql += ` and article.tagIds like '%${postData.tagId}%' `;
    }
    listSql += 'order by a.createTime desc ';
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
    const categoryData = await this.app.mysql.query(`select a.id,a.catName,b.counts from category a left join (select catId,counts from(select catId,count(*) as counts from article group by catId)tmp) b on a.id=b.catId ${Number(type) ? `where a.catType=${type}` : ''} order by counts DESC; `);
    return categoryData;
  }
  async getAllTag(type) {
    const tagData = await this.app.mysql.query(`select * from tag ${Number(type) ? `where tagType=${type}` : ''}`);
    return tagData;
  }
  async getArticleDetail(id) {
    const tagData = await this.app.mysql.query(`select * from article where id=${id}`);
    return tagData;
  }
  // 新增或修改文章
  async addOrUpdateArt(params, decode) {
    const { artTitle, artDesc, artCover, artContent, catId } = params;
    if (!params.artId) {
      // 新增
      const result = await this.app.mysql.insert('article', {
        artTitle,
        artDesc,
        artCover,
        artContent,
        catId,
        tagIds: '[1,2]',
        authorId: decode.userId,
      });
      return result.affectedRows === 1;
    }
    // 更新
    const result = await this.app.mysql.query(`update article set artTitle='${artTitle}', artDesc='${artDesc}', artCover='${artCover}', artContent='${artContent}', catId=${catId},tagIds='[1,2]',authorid=${decode.userId} where id=${params.artId}`);
    return result.affectedRows === 1;
  }
  // 更改文章或分类状态
  async changeType(params, dataName, statusName, idName) {
    const result = await this.app.mysql.query(`update ${dataName} set ${statusName}=${params.status} where id=${idName === 'artId' ? params.artId : params.catId}`);
    return result.affectedRows === 1;
  }

  // 新增/删除分类
  async setCategory(params) {
    const result = await this.app.mysql.query(``);
    return result.affectedRows === 1;
  }

  // 新增/删除标签
  async setTag(params) {
    const result = await this.app.mysql.query(``);
    return result.affectedRows === 1;
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
