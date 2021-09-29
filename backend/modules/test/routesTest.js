// Routes related to test

const testService = require("./serviceTest");
const Joi = require("@hapi/joi");
const ApiError = require("../../error/ApiError");

// Create schema for payload
const payloadSchema = Joi.object().keys({
  message: Joi.string().required(),
});

module.exports = (app) => {
  // Route for creating a new Test if message in payload is "Dont fail"
  app.post("/test", async (req, res, next) => {
    try {
      // Validate payload
      const { body } = req;
      const { error } = await payloadSchema.validate(body);
      if (error) next(ApiError.badRequestError(error.message));

      // Process data
      const result = await testService.testBody(body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
};
