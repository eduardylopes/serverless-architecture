class ResponseModel {
  constructor(data, statusCode) {
    if (typeof data === 'string') {
      this.body = JSON.stringify({ message });
    }
    if (typeof data === 'object') {
      this.body = JSON.stringify(data);
    }
    this.statusCode = statusCode;
  }
}

module.exports = ResponseModel;
