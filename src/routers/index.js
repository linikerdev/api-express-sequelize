const express = require("express");
const AuthController = require("../controller/AuthController");
const { authSchema } = require("../schemas/authSchema");

const cursoRoute = require("./cursos");

const route = express.Router();

module.exports = (app) => {
  app.use(route);

  route.post("/login", [authSchema], AuthController.login);

  cursoRoute(route);
};
