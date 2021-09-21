const express = require("express");
const CursoController = require("./controller/CursoController");
const AuthController = require("./controller/AuthController");
const { cursoSchema, cursoParams } = require("./schemas/cursoSchema");
const { inscricaoEmail, inscricao } = require("./schemas/inscricaoValidate");
const autenticated = require("./middlewares/authenticated");
const { authSchema } = require("./schemas/authSchema");

const routes = express.Router();

routes.post("/login", [authSchema], AuthController.login);

routes.get("/cursos", [autenticated], CursoController.index);

routes.post("/cursos", [cursoSchema], CursoController.store);
routes.get("/cursos/:id", [cursoParams], CursoController.show);

routes.post(
  "/cursos/:id/inscricao/",
  [cursoParams, inscricao],
  CursoController.createInscricao
);

routes.post(
  "/cursos/:id/inscricao_email/",
  [cursoParams, inscricaoEmail],
  CursoController.createInscricaoEmail
);

routes.delete(
  "/cursos/:id/inscricoes/:user_id",
  [cursoParams],
  CursoController.deleteInscricao
);

module.exports = routes;
1;
