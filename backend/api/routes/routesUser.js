const userService = require('../services/serviceUser');
const ApiError = require('../../error/ApiError');
const {validationResult, checkSchema} = require('express-validator');
const constants= require('../../constants');

const pathPrefix = constants.ApiPrefix;

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
module.exports = (app) => {
  // Route for registering a new user
  app.post(pathPrefix+'/users',
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
