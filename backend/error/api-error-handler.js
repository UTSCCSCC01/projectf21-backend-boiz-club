// Handle HTTP Errors

const ApiError = require("./ApiError");
module.exports = (err, req, res, next) => {
  console.log("Error: ", err);
  if (err instanceof ApiError) {
    res.status(err.code).json({ status: err.code, message: err.message });
    return;
  } else if (err instanceof SyntaxError) {
    res.status(400).json({ status: 400, message: "Invalid payload" });
    return;
  }
  res.status(500).json({ status: 500, message: "Something went wrong" });
};
