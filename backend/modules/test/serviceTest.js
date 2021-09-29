// All data processing related to test

const testDal = require("./dalTest");
const ApiError = require("../../error/ApiError");

module.exports = {
  /**
   * Checks creates a Test
   * @param {Object} body - test body
   */
  testBody: async (body) => {
    const { message } = body;
    if (message === "Dont fail") {
      return testDal.postTest(body);
    } else throw ApiError.badRequestError("Program failed successfully");
  },
};
