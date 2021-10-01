// All routes

const test = require('./modules/test');
const user = require('./modules/user');

module.exports = (app) => {
  test.testRoutes(app);
  user.userRoutes(app);
};
