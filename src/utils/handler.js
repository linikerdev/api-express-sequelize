const { validationResult } = require("express-validator");
const ErrorHandler = require("../config/ErrorHandler");

exports.validateDto = (checks) => {
  return [
    ...checks,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ErrorHandler(422, errors.array(), "ERROR_VALIDATE");
      } else {
        next();
      }
    },
  ];
};

exports.formatError = (err, res) => {
  const {
    statusCode = 500,
    message = "Aconteceu um erro inesperado",
    code = "ERROR",
  } = err;

  res.status(statusCode).json({
    statusCode,
    message,
    code,
  });
};
