// All routes
<<<<<<< HEAD
const routes = require('./api/routes');

module.exports = (app) => {
  routes.testRoutes(app);
  routes.userRoutes(app);
=======

const test = require('./modules/test');
const forgotPassword = require('./modules/forgotPassword');

module.exports = (app) => {
  test.testRoutes(app);
  forgotPassword.forgotPasswordRoutes(app);
>>>>>>> f75ecb4efdbcf872a70688c147441d606ed66b34
};
