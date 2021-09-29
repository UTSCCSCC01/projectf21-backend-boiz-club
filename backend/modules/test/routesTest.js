// Routes related to test

const testService = require("./serviceTest");
module.exports = (app) => {
  // Route for post create new test if message in payload is "Dont fail"
  app.post("/test", async (req, res, next) => {
    const { body } = req;
    try {
      const result = await testService.testBody(body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
};
