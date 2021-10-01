// All queries related to test

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model('Test', testSchema);

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
