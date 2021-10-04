const userService = require('../services/serviceUser');
const ApiError = require('../../error/ApiError');
const {validationResult, checkSchema} = require('express-validator');
const jwt = require('jsonwebtoken');

const pathPrefix = '/api/v1';

// Routes

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

module.exports = (app) => {
  // Route for registering a new user
  register(app);
  // Route for logging in returning user
  login(app);
};
