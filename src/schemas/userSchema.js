const { body, param } = require("express-validator");
const { validateDto } = require("../utils/handler");

exports.userSchema = validateDto([
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
  body("name")
    .notEmpty()
    .withMessage("O nome é obrigatório")
    .isString()
    .withMessage("O nome tem que ser um texto"),
  body("data_nascimento")
    .notEmpty()
    .withMessage("A data de nascimento é obrigatória")
    .isDate()
    .withMessage("Passe uma data de nascimento valida"),
  body("user_type")
    .isNumeric()
    .withMessage("O tipo do usuário é obrigatório")
    .isIn([1, 2])
    .withMessage("Não existe o tipo de usuário informado"),
  body("status").isBoolean().withMessage("O status é obrigatorio"),
]);
