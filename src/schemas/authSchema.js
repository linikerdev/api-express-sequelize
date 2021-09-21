const { body } = require("express-validator");
const { validateDto } = require("../utils/handler");

exports.authSchema = validateDto([
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email é item obrigatório"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Senha é item obrigatório")
]);
