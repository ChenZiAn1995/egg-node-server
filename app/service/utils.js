// eslint-disable-next-line strict
const qiniu = require('qiniu');
const Service = require('egg').Service;
class UtilsService extends Service {
  // 构建树形结构数据
  buildTree(data) {
    const res = [];
    // 找出所有根结点
    for (const item of data) {
      if (!item.parentId) {
        item.children = getNode(item.permissionId);
        res.push(item);
      }
    }
    // 传入根结点id 递归查找所有子节点
    function getNode(permissionId) {
      const node = [];
      for (const item of data) {
        if (item.parentId === permissionId) {
          item.children = getNode(item.permissionId);
          node.push(item);
        }
      }
      if (node.length === 0) return;
      return node;
    }
    return res;
  }
  // 获取权限列表
  async getRole(roleId) {
    const permissions = await this.app.mysql.query(`select * from role_permission left join permission on role_permission.permissionId = permission.id where roleId=${roleId}`);
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
    return uploadToken;
  }
}

module.exports = UtilsService;
