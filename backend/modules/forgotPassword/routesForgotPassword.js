const forgotPasswordService = require('./serviceForgotPassword');

module.exports = (app) => {
  app.post('/api/v1/forgot-password/:email', async (req, res, next) => {
    try {
      const result = await forgotPasswordService.sendOTPEmail(req.params.email);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
};
