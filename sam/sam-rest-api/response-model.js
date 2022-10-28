class ResponseModel {
  constructor(statusCode, message, data) {
    this.body = JSON.stringify({
      statusCode,
      message,
      data,
    });
    this.statusCode = statusCode;
  }
}

module.exports = ResponseModel;
