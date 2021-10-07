const storageService = require('../services/serviceStorage');
const ApiError = require('../../error/ApiError');
const constants= require('../../constants');
const verifyToken = require('../utils/verifyToken');
const pathPrefix = constants.ApiPrefix+'/storage';



//start Get S3 Image from Key
const getGovernmentId = (app) => {
  app.get(pathPrefix+'/gov-id/:key',
      verifyToken,
      async (req, res, next) => {
        try {
          const userId = req.user.user_id;
          const key = req.params.key;
          if (!file) {
            throw ApiError.badRequestError('Key required');
          }
          image = await storageService.getGovID(key, userId);
          res..json(
              {image: image});
        } catch (error) {
          next(error);
        }
      });
};
// End Get Govrnment ID

module.exports = (app) => {
  // Route for image from key
  getGovernmentId(app)
};