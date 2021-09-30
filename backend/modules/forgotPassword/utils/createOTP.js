const OTP = require('../models/otp');

const createOTP = async() => {
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    const expiration_time = new Date(new Date().getTime() + 30*60000);

    const otp = new OTP({
        otp: otp,
        expiration_time: expiration_time
    });

    const savedOTP = await otp.save();
    return savedOTP;
};

module.exports = createOTP;