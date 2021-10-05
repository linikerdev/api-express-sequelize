const { body } = require("express-validator");
const { validateDto } = require("../utils/handler");

const auth = [
  body("email").notEmpty().isEmail().withMessage("Email é item obrigatório"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Senha é item obrigatório"),
];

const register = [
  ...auth,
  body("name").notEmpty().isString().withMessage("O nome é obrigatório"),
  body("data_nascimento")
    .notEmpty()
    .isDate()
    .withMessage("A data de nascimento é obrigatória"),
  body("user_type")
    .default(2)
    .isNumeric()
    .withMessage("O tipo do usuário é obrigatório"),
  body("status")
    .default(true)
    .isBoolean()
    .withMessage("O status é obrigatorio"),
];

exports.authSchema = validateDto([...auth]);
exports.authRegisterSchema = validateDto([...register]);
