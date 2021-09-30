// All data processing related to test

const testDal = require('./dalTest');
const ApiError = require('../../error/ApiError');

module.exports = {
  /**
   * Checks and creates a Test
   * @param {Object} body - Request body
   */
  testBody: async (body) => {
    const {message} = body;
    if (message === 'Dont fail') {
      return testDal.postTest(body);
    } else throw ApiError.badRequestError('Program failed successfully');
  },
};
