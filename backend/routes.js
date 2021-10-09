// All routes
const routes = require('./api/routes');

module.exports = (app) => {
  routes.testRoutes(app);
  routes.userRoutes(app);
  routes.storageRoutes(app);
};
