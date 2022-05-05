const express = require("express");

const authRoute = require("./auth.routes");
const plansRoute = require("./plans.routes");
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
  plansRoute(route);
};
