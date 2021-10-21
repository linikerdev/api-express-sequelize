const { param } = require("express-validator");
const { validateDto } = require("../utils/handler");

exports.defaultParams = validateDto([
  param("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Informe um parametro numerico"),
]);
