module.exports = class ApiError {
  /**
   *
   * @param {Number} code  http status code
   * @param {String} message error message
   * @param {Array} errors express-validator errors array
   */
  constructor(code, message, errors) {
    (this.code = code), (this.message = message);
    this.errors = errors? errors:[];
  }

  /**
   *
   * @param {String} message error message
   * @param {Array} errors express-validator errors array
   * @return {ApiError}
   */
  static badRequestError(message, errors) {
    return new ApiError(400, message, errors);
  }

  /**
   * @return {ApiError}
   */
  static accessDeniedError() {
    return new ApiError(401, 'Access Denied');
  }
};
