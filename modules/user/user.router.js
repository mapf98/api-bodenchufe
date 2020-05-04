const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");

router.get("/all", userController.getAllUsers);

router.use(auth.validateToken);

router
  .route("/shoppingCart")
  .get(userController.getShoppingCart)
  .post(userController.checkProductAvailability, userController.addNewProduct);

router.delete(
  "/shoppingCart/:shoppingCartId",
  userController.deleteShoppingCartProduct
);

module.exports = router;
