const { validationResult } = require("express-validator");

exports.validateDto = (checks) => {
  return [
    ...checks,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};

exports.formatError = (err, res) => {
  const {
    statusCode = 500,
    message = "Aconteceu um erro inesperado",
    code = "ERROR",
  } = err;

  res
  .status(statusCode)
  .json({
    statusCode,
    message,
    code,
  });
};
