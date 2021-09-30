const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    expiration_time: {
        type: Date,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

OTPSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  });

const OTP = mongoose.model('Blog', blogSchema)
module.exports = OTP
