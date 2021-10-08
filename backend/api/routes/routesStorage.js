const storageService = require('../services/serviceStorage');
const ApiError = require('../../error/ApiError');
const constants= require('../../constants');
const pathPrefix = constants.ApiPrefix+'/storage';


// start Get S3 Image from Key

function encode(data){
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64
    }

const getMedia = (app) => {
  app.get(pathPrefix+'/media/:key',
      async (req, res, next) => {
        try {
          const key = req.params.key;
          if (!key) {
            throw ApiError.badRequestError('Key required');
          }
          const image = await storageService.getMedia(key);
          res.json(
              {image: encode(image.Body)});
        } catch (error) {
          next(error);
        }
      });
};
// End Get Govrnment ID

module.exports = (app) => {
  // Route for image from key
  getMedia(app);
};
