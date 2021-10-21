const UserController = require("../controller/UserController");
const onlyAdmin = require("../middlewares/onlyAdmin");
const { defaultParams } = require("../schemas/defaultSchema");
const { userSchema } = require("../schemas/userSchema");

module.exports = (route) => {
  route.get("/user", [onlyAdmin], UserController.index);

  route.get("/user/:id", [onlyAdmin, defaultParams], UserController.show);

  route.post("/user", [onlyAdmin, userSchema], UserController.store);

  route.put(
    "/user/:id",
    [onlyAdmin, defaultParams, userSchema],
    UserController.update
  );
  route.delete("/user/:id", [onlyAdmin, defaultParams], UserController.destroy);
};
