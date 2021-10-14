const express = require("express");
const CursoController = require("../controller/CursoController");

const authRoute = require("./auth.routes");
const cursoRoute = require("./cursos.routes");
const userRoute = require("./user.routes");

const route = express.Router();

module.exports = (app) => {
  app.use(route);
  // route.get("/portal/cursos", CursoController.index); //***
  // auth
  authRoute(route);

  // user
  userRoute(route);

  // curso
  cursoRoute(route);
};
