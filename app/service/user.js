// eslint-disable-next-line strict
const Service = require('egg').Service;
class UsersService extends Service {
  // 登录
  async login(params) {
    const validate = await this.app.mysql.query(`select user.user_id,user.user_name,user.user_phone,user.role_id,role_name from user  left join role on user.role_id = user.role_id where user_phone=${params.phone} and user_password=${params.password}`);
    if (validate.length) {
    // Todo  增加角色权限
    }
    return validate;
  }
  // 修改密码
  async changePassword(params) {
    const checkPassword = await this.app.mysql.query(`select user_id from user where user_id=${this.ctx.decode.user_id} and user_password=${params.oldPassword}`);
    if (!checkPassword.length) {
      return 0;
    }
    const updatePassword = await this.app.mysql.query(`update user set user_password=${params.newPassword} where user_id=${this.ctx.decode.user_id}`);
    if (updatePassword.changedRows) {
      return 2;
    }
    return 1;
  }
  // 根据token获取用户角色信息
  async getUserInfo(params) {
    const { user_id } = params;
    const data = await this.app.mysql.query(`select user.user_id,user.user_name,user.user_phone,user.role_id,role_name from user  left join role on user.role_id = role.role_id where user_id=${user_id}`);
    return data[0];
  }


  // 退出并清除用户信息
  // TODO 引入redis后清除redis相关数据
  async logout() {
    return true;
  }
}

module.exports = UsersService;
