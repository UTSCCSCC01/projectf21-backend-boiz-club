const ApiError = require('../../error/ApiError');
const s3 = require('../utils/s3');

module.exports = {
  /**
     * Get user information
     * @param {Object} key - s3 image key
  */
  getMedia: async (key) => {
    data = await s3.getFile(key);
    if (!data) {
      throw ApiError.badRequestError('Image could not be loaded');
    }
    return data;
  },
  uploadMedia: async (file) => {
    const data = await s3.upload(file);
    if (!data) {
      throw ApiError.badRequestError('Image could not be uploaded');
    }
    return data.key;
  },
};
