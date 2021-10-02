const userService = require('../services/serviceUser');
const ApiError = require('../../error/ApiError');
const {validationResult, checkSchema} = require('express-validator');
const jwt = require('jsonwebtoken');
const normalizeEmail = require('normalize-email');

const pathPrefix = '/api/v1';

// Start Registration
const registrationSchema = {
  username: {
    isAlphanumeric: {
      errorMessage: 'Username must be alphanumeric',
      bail: true,
    },
    custom: {
      options: (value) => {
        return userService.isUsernameUnique(value).then((unique) => {
          if (!unique) {
            return Promise.reject(
                new Error('Username already in use'),
            );
          }
        });
      },
      bail: true,
    },
  },
  email: {
    normalizeEmail: true,
    isEmail: {
      errorMessage: 'Please enter a valid email address',
      bail: true,
    },
    custom: {
      options: (value) => {
        return userService.isEmailUnique(value).then((unique) => {
          if (!unique) {
            return Promise.reject(
                new Error('Email already in use'),
            );
          }
        });
      },
      bail: true,
    },
  },
  password: {
    notEmpty: true,
    errorMessage: 'Password cannot be empty',
    bail: true,
  },
};

const register = (app) => {
  app.post(pathPrefix+'/users/register',
      checkSchema(registrationSchema),
      async (req, res, next) => {
        const {body} = req;
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw ApiError.badRequestError('Bad request', errors.array());
          }
          const result = await userService.registerUser(body);
          res.json(result);
        } catch (error) {
          next(error);
        }
      },
  );
};
// End Registration

// Start Login
const loginSchema = {
  email: {
    normalizeEmail: true,
    isEmail: {
      errorMessage: 'Please enter a valid email address',
      bail: true,
    },
  },
  password: {
    notEmpty: true,
    errorMessage: 'Password cannot be empty',
    bail: true,
  },
};

const login = (app) => {
  app.post(
      pathPrefix+'/users/login',
      checkSchema(loginSchema),
      async (req, res, next) => {
        const {body} = req;
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw ApiError.badRequestError('Bad request', errors.array());
          }
          const user = await userService.getUserByCredentials(body);
          const token = jwt.sign(
              {user_id: user._id,
                username: user.username,
              },
              process.env.TOKEN_SECRET);
          res.header('auth-tken', token).send(user);
        } catch (error) {
          next(error);
        }
      },
  );
};
// End Login
// Start Upload Govrnment ID
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


const uploadGovernmentId = (app) => {
  app.post(pathPrefix+'/users/self/request-verification',
      upload,
      (req, res, next) => {
        try {
          if (!req.file) {
            throw ApiError.badRequestError('File required');
          }
        } catch (error) {
          next(error);
        }
        // verify jwt token is valid
        // verify user is not already verified
        // verify user does not have a pending verification
        // upload file to s3
        // upload gov_id object to mongoose
        res.send(req.file);
      });
};
// End Upload Govrnment ID

const forgotPassword = (app) => {
  app.post(pathPrefix + '/forgot-password/:email', async (req, res, next) => {
    try {
      const result = await
      userService.sendOTPEmail(normalizeEmail(req.params.email));
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
};

module.exports = (app) => {
  // Route for registering a new user
  register(app);
  // Route for logging in returning user
  login(app);
  forgotPassword(app);
  // Route for uploading government id
  uploadGovernmentId(app);
};
