// eslint-disable-next-line strict
const Service = require('egg').Service;
class UsersService extends Service {
  // 登录
  async login(params) {
    const validate = await this.app.mysql.query(`select user.id,user.userName,user.userPhone,user.roleId,roleName from user  left join role on user.roleId = role.id where userPhone=${params.phone} and userPassword=${params.password}`);
    if (validate.length) {
    // Todo  增加角色权限
    }
    return validate;
  }
  // 修改密码
  async changePassword(params) {
    const checkPassword = await this.app.mysql.query(`select id from user where id=${this.ctx.decode.userId} and userPassword=${params.oldPassword}`);
    if (!checkPassword.length) {
      return 0;
    }
    const updatePassword = await this.app.mysql.query(`update user set userPassword=${params.newPassword} where id=${this.ctx.decode.userId}`);
    if (updatePassword.changedRows) {
      return 2;
    }
    return 1;
  }
  // 根据token获取用户角色信息
  async getUserInfo(userId) {
    const data = await this.app.mysql.query(`select user.id,user.userName,user.userPhone,user.roleId,roleName from user  left join role on user.roleId = role.id where user.id=${userId}`);
    return data[0];
  }


  // 退出并清除用户信息
  // TODO 引入redis后清除redis相关数据
  async logout() {
    return true;
  }
}

module.exports = UsersService;
