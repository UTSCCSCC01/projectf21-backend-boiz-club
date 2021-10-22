module.exports = class ApiError {
  /**
   *
   * @param {String} message error message
   * @param {Array} errors express-validator errors array
   * @return {ApiError}
   */
  constructor(code, message, errors) {
    (this.code = code), (this.message = message);
    this.errors = errors ? errors : [];
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
   * @param {String} message error message
   * @param {Array} errors express-validator errors arr
   * @return {ApiError}
   */
  static notFoundError(message, errors) {
    return new ApiError(404, message, errors);
  }

  /**
   * @return {ApiError}
   */
  static accessDeniedError() {
    return new ApiError(401, 'Access Denied');
  }
};
