const storageService = require('../services/serviceStorage');
const ApiError = require('../../error/ApiError');
const constants= require('../../constants');
const pathPrefix = constants.ApiPrefix+'/storage';

/**
 *
 * @param {*} data data to encode
 * @return {*} encoded data
 */
function encode(data) {
  const buf = Buffer.from(data);
  const base64 = buf.toString('base64');
  return base64;
}


// Start Upload Image
const multer = require('multer');
const serviceStorage = require('../services/serviceStorage');
const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  },
});
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(ApiError.badRequestError('Invalid file type'), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter: fileFilter,
}).single('media');


const uploadMedia = (app) => {
  app.post(
      pathPrefix + '/media',
      upload,
      async (req, res, next) => {
        try {
          const file = req.file;
          if (!file) {
            throw ApiError.badRequestError('File required');
          }
          const mediaId = await serviceStorage.uploadMedia(file);
          res
              .status(200)
              .send({status: 200,
                message: 'Successfully uploaded image',
                mediaId: mediaId});
        } catch (error) {
          next(error);
        }
      },
  );
};
// End Upload Image

// Start Get S3 Image from Key
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
// End Get S3 Image from Key

module.exports = (app) => {
  // Route for image upload
  uploadMedia(app);
  // Route for image from key
  getMedia(app);
};
