const userService = require('../services/serviceUser');
const ApiError = require('../../error/ApiError');
const {validationResult, checkSchema} = require('express-validator');
const constants = require('../../constants');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');
const pathPrefix = constants.ApiPrefix+'/users';

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
            return Promise.reject(new Error('Username already in use'));
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
            return Promise.reject(new Error('Email already in use'));
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
  app.post(
      pathPrefix + '/register',
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
      pathPrefix + '/login',
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
              {user_id: user._id, username: user.username},
              process.env.TOKEN_SECRET,
          );
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
}).single('gov-id');

const uploadGovernmentId = (app) => {
  app.post(
      pathPrefix + '/self/request-verification',
      verifyToken,
      upload,
      async (req, res, next) => {
        try {
          const userId = req.user.user_id;
          const file = req.file;
          if (!file) {
            throw ApiError.badRequestError('File required');
          }
          await userService.handleVerificationRequest(file, userId);
          res
              .status(200)
              .send({status: 200, message: 'Successfully uploaded image'});
        } catch (error) {
          next(error);
        }
      },
  );
};
// End Upload Government ID/Request Verification

/*
Forgot password request
*/
const forgotPassword = (app) => {
  app.post(pathPrefix + '/forgot-password/:email', async (req, res, next) => {
    try {
      const result = await
      userService.sendOTPEmail(req.params.email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });
};

// Start get user info
const getUser = (app) => {
  app.get(pathPrefix + '/self', verifyToken, async (req, res, next) => {
    const {user} = req;
    try {
      const userInfo = await userService.getUser(user.user_id);
      res.send(userInfo);
    } catch (error) {
      next(error);
    }
  });
};
// End get user info

// Start verify user
const verifyUser = (app) => {
  app.put(
      pathPrefix + '/verification-request',
      verifyToken,
      async (req, res, next) => {
        const {user} = req;
        const {user_id: userId, approved} = req.body;
        try {
          if (!userId || approved == null) {
            throw ApiError
                .badRequestError('user_id and approved not in payload');
          }
          await userService.assertAdmin(user.user_id);
          await userService.verifyUser(userId, approved);
          res.status(200).send({
            status: 200,
            message: approved ?
            'Successfully verified user' :
            'Successfully declined verification request',
          });
        } catch (error) {
          next(error);
        }
      },
  );
};
// End verify user

// Start get verification requests
const retrieveVerification = (app) => {
  app.get(pathPrefix+ '/verification-request',
      verifyToken,
      async (req, res, next) => {
        try {
          const {user} = req;
          const limit = parseInt(req.query.limit);
          const skip = parseInt(req.query.skip);
          await userService.assertAdmin(user.user_id);
          const verificationRequestList =
          await userService.getPagableVerificationRequests(
              limit, skip,
          );
          res.status(200).send({status: 200, data: verificationRequestList});
        } catch (error) {
          next(error);
        }
      },
  );
};
// End get verification requests

// Start reset password
const resetPasswordSchema = {
  encryptedEmail: {
    notEmpty: true,
    errorMessage: 'Encrypted email cannot be empty',
    bail: true,
  },
  encryptedOTPId: {
    notEmpty: true,
    errorMessage: 'Encrypted OTP ID cannot be empty',
    bail: true,
  },
  otp: {
    isLength: {
      options: {min: 6, max: 6},
      errorMessage: 'OTP must be exactly 6 characters long',
    },
    isInt: {
      errorMessage: 'OTP must consist of only integers',
    },
    bail: true,
  },
  password: {
    isLength: {
      options: {min: 8, max: 12},
      errorMessage: 'Password must be between 8 to 12 characters long',
    },
    bail: true,
  },
};

const resetPassword = (app) => {
  app.post(pathPrefix + '/reset-password/:email',
      checkSchema(resetPasswordSchema),
      async (req, res, next) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw ApiError.badRequestError('Bad request', errors.array());
          }
          await userService.resetPassword(req.params.email, req.body);
          res.status(200).json({
            message: 'Password has been successfully updated'});
        } catch (error) {
          next(error);
        }
      });
};
// End reset password

// Start get user info by user id
const getUserById = (app) => {
  app.get(pathPrefix + '/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        throw ApiError.badRequestError('User Id required');
      }
      const userInfo = await userService.getUser(userId);
      if (!userInfo) {
        throw ApiError.badRequestError('User Id does not exist');
      }
      res.send(userInfo);
    } catch (error) {
      if (error.reason instanceof TypeError) {
        next(ApiError.badRequestError('Invalid Id'));
      }
      next(error);
    }
  });
};
// Start get user info by user id

// Start update account info
const updateAccountInfo = (app) => {
  app.put(pathPrefix + '/self',
      verifyToken, async (req, res, next) => {
        try {
          const {user} = req;
          const userId = user.user_id;
          const update = await userService.updateUserInfo(userId, req.body);
          if (!update) {
            throw ApiError.badRequestError('Update cannot be performed');
          }

          const updatedInfo = await userService.getUser(user.user_id);

          res.status(200).json(updatedInfo);
        } catch (error) {
          next(error);
        }
      });
};
// End update account info

module.exports = (app) => {
  // Route for registering a new user
  register(app);
  // Route for logging in returning user
  login(app);
  // Route for forgot password request
  forgotPassword(app);
  // Route for uploading government id
  uploadGovernmentId(app);
  // Route for getting user information
  getUser(app);
  // Route for resetting a user's password
  resetPassword(app);
  // Route for verifying users
  verifyUser(app);
  // Route for retrieving a pagable verification request
  retrieveVerification(app);
  // Route for getting user information by user id
  getUserById(app);
  // Route for updating a user account's information
  updateAccountInfo(app);
};
