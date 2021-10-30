const mongoose = require('mongoose');
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
    enum: ['unverified', 'verified', 'admin'],
    default: 'unverified',
  },
  profile_pic: {
    type: String,
    required: false,
    default: '0306ae8a-9eef-4b9f-b145-84093a025120.jpg',
  },
}, {timestamps: true, versionKey: false});


const User = mongoose.model('User', userSchema);

module.exports=User;
