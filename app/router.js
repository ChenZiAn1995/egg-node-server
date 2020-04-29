'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.prefix('/api');
  router.post('/blog/selective', controller.blog.selective); // 根据搜索条件查询文章
  router.post('/blog/getAllClassify', controller.blog.getAllClassify); //  根据条件查询所有分类和标签，或者其中任意一种
  router.post('/blog/getArticleDetail', controller.blog.getArticleDetail); // 根据articleId获取文章详细内容

  router.post('/users/login', controller.users.login);// 登录接口
};
