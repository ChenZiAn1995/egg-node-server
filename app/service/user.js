// eslint-disable-next-line strict
const Service = require('egg').Service;
class UsersService extends Service {
  // implement
  async login(params) {
    const validate = await this.app.mysql.query(`select user_login.user_id,user_login.user_name,user_login.user_phone,user_login.role_id,role_name from user_login  left join user_role on user_login.role_id = user_role.role_id where user_phone=${params.phone} and user_password=${params.password}`);
    if (validate.length) {
    // Todo  增加角色权限
    }
    return validate;
  }

  async changePassword(params) {
    const checkPassword = await this.app.mysql.query(`select user_id from user_login where user_id=${this.ctx.decode.user_id} and user_password=${params.oldPassword}`);
    if (!checkPassword.length) {
      return 0;
    }
    const updatePassword = await this.app.mysql.query(`update user_login set user_password=${params.newPassword} where user_id=${this.ctx.decode.user_id}`);
    if (updatePassword.changedRows) {
      return 2;
    }
    return 1;
  }

}

module.exports = UsersService;
