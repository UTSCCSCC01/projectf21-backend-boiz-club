// Routes related to test

const testService = require('./serviceTest');

const ApiError = require('../../error/ApiError');

const {body, validationResult} = require('express-validator');

module.exports = (app) => {
  // Route for creating a new Test if message in payload is "Dont fail"
  app.post('/test',
      // Validate & sanitize payload
      body('message').escape().notEmpty().withMessage('Please enter a message'),
      // Handle request
      async (req, res, next) => {
        try {
          // Check payload validation result
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw ApiError.badRequestError('Bad request', errors.array());
          }
          // Process data
          const result = await testService.testBody(body);
          res.json(result);
        } catch (error) {
          next(error);
        }
      });
};
