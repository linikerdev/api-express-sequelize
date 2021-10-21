const AuthController = require("../controller/AuthController");
const { authSchema, authRegisterSchema } = require("../schemas/authSchema");

module.exports = (route) => {
  route.post("/login", [authSchema], AuthController.login);
  route.post("/register", [authRegisterSchema], AuthController.register);
};
