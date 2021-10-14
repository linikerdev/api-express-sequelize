const { body, param } = require("express-validator");
const { validateDto } = require("../utils/handler");

exports.cursoSchema = validateDto([
  body("name").notEmpty().withMessage("O nome do curso é obrigatório"), //1
  body("description").notEmpty().withMessage("A descricao curso é obrigatório"), //2
  body("coordinator") // 3
    .notEmpty()
    .withMessage("Nome do coordenador é obrigatorio"),
  body("status")
    .default(true)
    .isBoolean()
    .withMessage("Status do curso é obrigatório"), // 4
]);

exports.cursoParams = validateDto([
  param("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Informe um parametro numerico"),
]);
