const autenticated = require("../middlewares/authenticated");
const UserController = require("../controller/UserController");

module.exports = (route) => {
  route.get("/user", [autenticated], UserController.index);
};
