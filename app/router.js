'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const jwt = app.middleware.jwt(app.config.jwt);
  const { router, controller } = app;
  router.prefix('/api');
  router.post('/blog/selective', controller.blog.selective); // 根据搜索条件查询文章
  router.post('/blog/getAllClassify', controller.blog.getAllClassify); //  根据条件查询所有分类和标签，或者其中任意一种
  router.post('/blog/getArticleDetail', controller.blog.getArticleDetail); // 根据articleId获取文章详细内容

  router.post('/user/login', controller.user.login);// 登录接口
  router.post('/user/changePassword', jwt, controller.user.changePassword); // 修改密码接口
  // router.post('/user/getUserInfo', jwt, controller.user.getUserInfo); // 根据token获取用户信息
};
