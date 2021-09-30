// Routes related to test

const testService = require('./serviceTest');

const ApiError = require('../../error/ApiError');

const {validationResult, checkSchema} = require('express-validator');

const testSchema = {
  message: {
    notEmpty: true,
    // escape: true, // Escapes symbols
    errorMessage: 'Please enter a valid message',
  },
};

module.exports = (app) => {
  // Route for creating a new Test if message in payload is "Dont fail"
  app.post('/test',
      // Validate & sanitize payload
      checkSchema(testSchema),
      // Handle request
      async (req, res, next) => {
        try {
          // Check payload validation result
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw ApiError.badRequestError('Bad request', errors.array());
          }
          // Process data
          const result = await testService.testBody(req.body);
          res.json(result);
        } catch (error) {
          next(error);
        }
      });
};
