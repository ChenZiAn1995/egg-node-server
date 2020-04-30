class BasicModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.msg = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.msg = message;
    }
  }
}

class SuccessModel extends BasicModel {
  constructor(data, message = '操作成功', resCode) {
    super(data, message);
    this.resCode = resCode || '0000';
  }
}

class ErrorModel extends BasicModel {
  constructor(data, message = '操作失败', resCode) {
    super(data, message);
    this.resCode = resCode || '5000';
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
