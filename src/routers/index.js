const express = require("express");
const AuthController = require("../controller/AuthController");
const { authSchema, authRegisterSchema } = require("../schemas/authSchema");

const cursoRoute = require("./cursos.routes");
const userRoute = require("./user.routes");

const route = express.Router();

module.exports = (app) => {
  app.use(route);

  route.post("/login", [authSchema], AuthController.login);
  route.post("/register", [authRegisterSchema], AuthController.register);

  // user
  userRoute(route);

  // curso
  cursoRoute(route);
};
