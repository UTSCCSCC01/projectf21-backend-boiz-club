const userService = require('../services/serviceUser');
const ApiError = require('../../error/ApiError');

/**
   * Verifies a user is an admin
   * @param {Object} req - user's request once they
   * have been verified by verifyToken
   */
const verifyAdmin = async (req) => {
  const {user} = req;
  const currUser = await userService.getUser(user.user_id);
  if (currUser.authentication_lvl != 'admin') {
    throw ApiError.accessDeniedError();
  }
  return;
};

module.exports = verifyAdmin;
