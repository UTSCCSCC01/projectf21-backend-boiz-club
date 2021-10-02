const jwt = require('jsonwebtoken');
const ApiError = req('../../error/ApiError');

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) next(ApiError.accessDeniedError());
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (error) {
    next(ApiError.badRequestError('Invalid token'));
  }
};

module.exports = auth;
