const ApiError = require('../../error/ApiError');
const userDal = require('../repositories/dalUser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = {
  /**
   *
   * @param {String} email
   * @return {Boolean} whether the email is unique inside database
   */
  isEmailUnique: async (email) => {
    return userDal.isEmailUnique(email);
  },
  /**
  *
  * @param {String} username
  * @return {Boolean} whether the username is unique inside database
  */
  isUsernameUnique: async (username) => {
    return userDal.isUsernameUnique(username);
  },
  /**
     * Registers a new user
     * @param {Object} body - user credentials
  */
  registerUser: async (body) => {
    return userDal.createUser(body);
  },
  /**
     * Registers a new user
     * @param {Object} body - user login credentials
  */
  getUserByCredentials: async (body) => {
    const cred = await userDal.getCredential(body.email);
    if (!cred) {
      throw ApiError.badRequestError('Invalid credentials');
    }
    const hash = crypto.createHmac('sha512', cred.salt);
    hash.update(body.password);
    const saltedHash = hash.digest('base64');
    if (saltedHash != cred.password) {
      return ApiError.badRequestError('Invalid credentials');
    } else return await userDal.getUser(cred.user_id);
  },
};
