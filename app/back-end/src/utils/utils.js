class ErrorHttp extends Error {
  constructor(message, http) {
    super(message);
    this.http = http;
  }
}

module.exports = ErrorHttp;