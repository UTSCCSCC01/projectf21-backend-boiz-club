module.exports = class ApiError {
  constructor(code, message) {
    (this.code = code), (this.message = message);
  }
  static badRequestError(message) {
    return new ApiError(400, message);
  }
};
