// eslint-disable-next-line strict
const qiniu = require('qiniu');
const Service = require('egg').Service;
class UtilsService extends Service {
  // 构建树形结构数据
  buildTree(data) {
    const res = [];
    // 找出所有根结点
    for (const item of data) {
      if (!item.parent_id) {
        item.children = getNode(item.permission_id);
        res.push(item);
      }
    }
    // 传入根结点id 递归查找所有子节点
    function getNode(permission_id) {
      const node = [];
      for (const item of data) {
        if (item.parent_id === permission_id) {
          item.children = getNode(item.permission_id);
          node.push(item);
        }
      }
      if (node.length === 0) return;
      return node;
    }
    return res;
  }
  // 获取权限列表
  async getRole(role_id) {
    const permissions = await this.app.mysql.query(`select * from role_permission left join permission on role_permission.permission_id = permission.permission_id where role_id=${role_id}`);
    const data = this.buildTree(permissions);
    return data;
  }

  // 获取七牛云列表
  async getQiniuToken() {

    const accessKey = 'jTllAkjokWHTxIxsZ0zSWlFKL9hzmGzazAmP9YJR';
    const secretKey = 'A0lYdzXS96IaqaPJwn1W2__HZRWSsNsCtGzOaICq';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: 'chenzian_blog',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
  }
}

module.exports = UtilsService;
