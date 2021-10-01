const createUserService = require('./serviceCreateUser');
const ApiError = require('../../error/ApiError');

const {validationResult, checkSchema} = require('express-validator');

const registrationSchema = {
  username: {
    isAlphanumeric: {
      errorMessage: 'Username must be alphanumeric',
      bail: true,
    },
    custom: {
      options: (value) => {
        return createUserService.isUsernameUnique(value).then((unique) => {
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
        return createUserService.isEmailUnique(value).then((unique) => {
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
  app.post('/api/v1/users',
      checkSchema(registrationSchema),
      async (req, res, next) => {
        const {body} = req;
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw ApiError.badRequestError('Bad request', errors.array());
          }
          const result = await createUserService.registerUser(body);
          res.json(result);
        } catch (error) {
          next(error);
        }
      },
  );

  // Development code
  // app.get('/nukeUserCredential', ()=>{
  //   userService.nukeUserCredential();
  // });
};
