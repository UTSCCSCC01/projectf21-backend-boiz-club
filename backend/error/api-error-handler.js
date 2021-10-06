// Handle HTTP Errors
const ApiError = require('./ApiError');

module.exports = (err, req, res, next) => {
  console.error('Error: ', err);
  if (err instanceof ApiError) {
    res.status(err.code).json({status: err.code,
      message: err.message,
      errors: err.errors});
    return;
  } else if (err instanceof SyntaxError) {
    res.status(400).json({status: 400,
      message: 'Invalid payload',
      errors: []});
    return;
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(400).json({status: 400,
      message: 'File size exceeds 5 MB',
      errors: []});
    return;
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    res.status(400).json({status: 400,
      message: 'Invalid file key',
      errors: []});
    return;
  }
  res.status(500).json({status: 500,
    message: 'Something went wrong'});
};
