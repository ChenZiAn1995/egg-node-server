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
  router.post('/blog/addOrUpdateArt', jwt, controller.blog.addOrUpdateArt); // 根据是否有art_id 判断新增或更新
  router.post('/blog/changeArtStatus', jwt, controller.blog.changeArtStatus); // 根据status 修改文章状态
  router.post('/blog/changeCatStatus', jwt, controller.blog.changeCatStatus); // 根据status 修改分类状态
  router.post('/blog/setCatOrTag', jwt, controller.blog.addOrUpdateCategoryAndTag); // 根据status新增or更新 根据type确立分类or标签


  router.post('/user/login', controller.user.login);// 登录接口
  router.post('/user/changePassword', jwt, controller.user.changePassword); // 修改密码接口
  router.post('/user/logout', jwt, controller.user.logout); // 退出并清除用户信息
  router.post('/user/getUserInfo', jwt, controller.utils.getUserInfo); // 根据token获取用户角色数据信息
  router.post('/utils/getQiniuToken', jwt, controller.utils.getQiniuToken); // 获取七牛云token上传图片
};
