// All routes

const test = require("./modules/test");

module.exports = (app) => {
  test.testRoutes(app);
};
