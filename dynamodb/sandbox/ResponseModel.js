class ResponseModel {
  constructor(message, statusCode) {
    this.body = JSON.stringify({ message });
    this.statusCode = statusCode;
  }
}

module.exports = ResponseModel;
