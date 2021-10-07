const ApiError = require("../../error/ApiError");
const userDal = require("../repositories/dalUser");
const crypto = require("crypto");
const s3 = require("../utils/s3");

module.exports = {
  /**
   *  Checks if email is unique
   * @param {String} email
   * @return {Boolean} whether the email is unique inside database
   */
  isEmailUnique: async (email) => {
    return userDal.isEmailUnique(email);
  },
  /**
   * Checks if username is unique
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
   * Gets user by email and password
   * @param {Object} body - user login credentials
   */
  getUserByCredentials: async (body) => {
    const cred = await userDal.getCredential(body.email);
    if (!cred) {
      throw ApiError.badRequestError("Invalid credentials");
    }
    const hash = crypto.createHmac("sha512", cred.salt);
    hash.update(body.password);
    const saltedHash = hash.digest("base64");
    if (saltedHash != cred.password) {
      throw ApiError.badRequestError("Invalid credentials");
    } else return await userDal.getUser(cred.user_id);
  },
  /**
   * Saves verification request and government id
   * @param {Object} file - user government id
   * @param {Object} userId - logged in user's id
   */
  handleVerificationRequest: async (file, userId) => {
    // Check if already verified
    const user = await userDal.getUser(userId);
    if (user.authentication_lvl != "unverified") {
      throw ApiError.badRequestError("User already verified");
    }
    // Check if user has pending verification
    const request = await userDal.getVerificationRequest(userId);
    if (request) {
      throw ApiError.badRequestError("User has a pending verification request");
    }
    // Upload file to s3
    const uploadedFile = await s3.upload(file);
    // Add pending verification to db
    await userDal.createVerificationRequest(userId, uploadedFile.key);
    return;
  },
  /**
   * Approve or decline user's verification request.
   * @param adminUserId - the admin's id
   * @param userId - the user id
   * @param approved - whether the user is approved/declined
   */
  verifyUser: async (adminUserId, userId, approved) => {
    const adminUser = await userDal.getUser(adminUserId);
    const user = await userDal.getUser(userId);

    if (!user) throw ApiError.notFoundError("User not found");
    else if (user.authentication_lvl === "verified")
      throw ApiError.badRequestError("User already verified.");
    else if (adminUser.authentication_lvl !== "admin")
      throw ApiError.accessDeniedError();

    // check if user has pending verification
    if (!(await userDal.getVerificationRequest(userId)))
      throw ApiError.badRequestError("User has not requested to be verified.");

    if (approved) await userDal.verifyUser(userId);
    else await userDal.removeVerificationRequest(userId);
  },
  /**
   * Get user information
   * @param {Object} userId - user id
   */
  getUser: async (userId) => {
    return await userDal.getUser(userId);
  },
};
