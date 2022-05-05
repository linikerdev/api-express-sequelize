const PlansController = require("../controller/PlansController");
const authenticated = require("../middlewares/authenticated");

module.exports = (route) => {
  route.get("/plans",[authenticated], PlansController.index);
  route.get("/plans2",[], PlansController.index);
};
