const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userCredentialSchema = new Schema({
  user_id: {
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

module.exports=UserCredential;
