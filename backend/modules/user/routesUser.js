const ApiError = require('../../error/ApiError');

/*
Multer to upload images, filter file types to accept only images,
limit file upload size to 5 MB and accept file with key gov_id
*/
const multer = require('multer');
const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  },
});
const fileFilter = (req, file, callback) =>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(ApiError.badRequestError('Invalid file type'), false);
  }
};
const upload = multer(
    {storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
      },
      fileFilter: fileFilter,
    }).single('gov_id');

const prefix = '/api/v1/users';

module.exports = (app) => {
  app.post(prefix+'/self/request-verification', upload, (req, res, next) => {
    // verify jwt token is valid
    // verify user is not already verified
    // verify user does not have a pending verification
    // upload file to s3
    // upload gov_id object to mongoose
    res.send(req.file);
  });
};
