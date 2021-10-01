// All routes

const test = require('./modules/test');
const user = require('./modules/createUser');

module.exports = (app) => {
  test.testRoutes(app);
  user.userRoutes(app);
};
