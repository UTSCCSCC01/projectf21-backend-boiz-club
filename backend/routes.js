// All routes

const test = require('./modules/test');
const forgotPassword = require('./modules/forgotPassword');

module.exports = (app) => {
  test.testRoutes(app);
  forgotPassword.forgotPasswordRoutes(app);
};
