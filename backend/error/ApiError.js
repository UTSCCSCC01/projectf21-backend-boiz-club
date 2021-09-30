module.exports = class ApiError {
  /**
   *
   * @param {String} message error message
   * @param {Array} errors express-validator errors array
   * @return {ApiError}
   */
  static requestNotFoundError(message, errors) {
    return new ApiError(404, message, errors);
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
};
