const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: false,
    default: null,
  },
  last_name: {
    type: String,
    required: false,
    default: null,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },
  phone_number: {
    type: String,
    required: false,
    default: null,
  },
  authentication_lvl: {
    type: String,
    enum: ['unverified', 'verified'],
    default: 'unverified',
  },
}, {timestamps: true, versionKey: false});

const userCredentialSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
}, {timestamps: true, versionKey: false});

const UserCredential = mongoose.model('User_Credential', userCredentialSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  /**
   *
   * @param {String} email
   * @return {Boolean} whether the email is unique inside database
   */
  isEmailUnique: async (email) => {
    const result = await UserCredential.find({email});
    console.log('isEmailUnique', result);
    return result.length == 0;
  },
  /**
   *
   * @param {String} username
   * @return {Boolean} whether the username is unique inside database
   */
  isUsernameUnique: async (username) => {
    const result = await User.find({username});
    console.log('isUsernameUnique', result);
    return result.length == 0;
  },
  /**
   * Registers a new user
   * @param {Object} body - user credentials
   */
  registerUser: async (body) => {
    const {username, email, password} = body;
    const user = new User({username});
    const userID = user.id;
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const saltedHash = hash.digest('base64');
    const userCred = new UserCredential({
      username,
      email,
      password: saltedHash,
      user_id: userID,
      salt,
    });
    await userCred.save();
    return user.save();
  },

  // Developement code
  // nukeUserCredential: async ()=>{
  //   return UserCredential.find().remove();
  // },
};


