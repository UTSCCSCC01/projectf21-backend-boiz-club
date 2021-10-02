const jwt = require('jsonwebtoken');
const ApiError = require('../../error/ApiError');

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) throw ApiError.accessDeniedError();
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (error) {
    throw ApiError.badRequestError('Invalid token');
  }
  next();
};

module.exports = auth;
