// All queries related to test

const Test = require('../models/modelTest');

module.exports = {
  /**
   * Creates new Test
   * @param {Object} body - Request body
   */
  postTest: async (body) => {
    const {message} = body;
    const test = new Test({
      message,
    });
    return test.save();
  },
};
