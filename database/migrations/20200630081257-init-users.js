'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BIGINT, BOOLEAN } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userName: { type: STRING(30), comment: '用户名称' },
      phone: { type: BIGINT(11), comment: '用户手机号码' },
      password: { type: STRING(50), comment: '用户登录密码' },
      roleId: { type: INTEGER, comment: '角色id' },
      status: { type: INTEGER, comment: '状态(1-启用 2-禁用)' },
      isDelete: { type: BOOLEAN, defaultValue: 0, comment: '是否删除' },
      creater: { type: INTEGER, comment: '创建者' },
      updater: { type: INTEGER, comment: '更新者' },
      lastLoginTime: { type: DATE, allowNull: false, comment: '最后登录时间' },
      updateTime: { type: DATE, comment: '修改时间' },
      createTime: { type: DATE, comment: '创建时间' },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
