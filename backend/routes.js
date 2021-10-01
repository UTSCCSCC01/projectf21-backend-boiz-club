// All routes

const test = require('./modules/test');
const createUser = require('./modules/createUser');

module.exports = (app) => {
  test.testRoutes(app);
  createUser.createUserRoutes(app);
};
