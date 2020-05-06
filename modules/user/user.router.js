const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");
const deliveryAddressController = require("../delivery_address/delivery_address.controller");
const orderController = require("../order/order.controller");

router.get("/all", userController.getAllUsers);

router.use(auth.validateToken);

router
  .route("/shoppingCart")
  .get(userController.getShoppingCart)
  .post(userController.checkProductAvailability, userController.addNewProduct);

router.patch(
  "/shoppingCart/:shoppingCartId/quantity",
  userController.checkProductAvailability,
  userController.updateProductQuantity
);

router.get(
  "/deliveryAddress",
  deliveryAddressController.getAllDeliveryAddresses
);

router.patch(
  "/deliveryAddress/:deliveryAddressId",
  deliveryAddressController.changeAddressStatus
);

router.get("/orders", orderController.getUserOrders);

module.exports = router;
