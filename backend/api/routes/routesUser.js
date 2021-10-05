const userService = require('../services/serviceUser');
const ApiError = require('../../error/ApiError');
const {validationResult, checkSchema} = require('express-validator');
const jwt = require('jsonwebtoken');
const normalizeEmail = require('normalize-email');
const verifyToken = require('../utils/verifyToken');
const verify = require('../utils/verifyToekn');

const pathPrefix = '/api/v1/users';

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
  app.post(pathPrefix+'/register',
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
      pathPrefix+'/login',
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
          res.header('auth-token', token).send(user);
        } catch (error) {
          next(error);
        }
      },
  );
};
// End Login
// Start Upload Govrnment ID/Request Verification
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
    }).single('gov-id');


const uploadGovernmentId = (app) => {
  app.post(pathPrefix+'/self/request-verification',
      verifyToken, upload,
      async (req, res, next) => {
        try {
          const userId = req.user.user_id;
          const file = req.file;
          if (!file) {
            throw ApiError.badRequestError('File required');
          }
          await userService.handleVerificationRequest(file, userId);
          res.status(200).send(
              {status: 200,
                message: 'Successfully uploaded image'});
        } catch (error) {
          next(error);
        }
      });
};
// End Upload Govrnment ID/Request Verification

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
// Start get user info
const getUser = (app) => {
  app.get(
      pathPrefix+'/self',
      verifyToken,
      async (req, res, next) => {
        const {user} = req;
        try {
          const userInfo = await userService.getUser(user.user_id);
          res.send(userInfo);
        } catch (error) {
          next(error);
        }
      },
  );
};
// End get user info

module.exports = (app) => {
  // Route for registering a new user
  register(app);
  // Route for logging in returning user
  login(app);
  forgotPassword(app);
  // Route for uploading government id
  uploadGovernmentId(app);
  // Route for getting user information
  getUser(app);
};
