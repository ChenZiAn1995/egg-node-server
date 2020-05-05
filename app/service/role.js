// eslint-disable-next-line strict
const Service = require('egg').Service;
class RolesService extends Service {
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
}

module.exports = RolesService;
