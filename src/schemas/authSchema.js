const { body } = require("express-validator");
const { validateDto } = require("../utils/handler");

const auth = [
  body("email")
    .notEmpty()
    .withMessage("O campo e-mail não pode ser vazio")
    .isEmail()
    .withMessage("O campo e-mail deve passar o tipo email"),

  body("password", "senha com erro")
    .notEmpty()
    .withMessage("A senha não pode ser vazia")
    .isString()
    .withMessage("A senha deve ser do tipo Alfanumerico")
    .isLength({ min: 5 })
    .withMessage("A senha deve conter no minimo 5 caracteres"),
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
