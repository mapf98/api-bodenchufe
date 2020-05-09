const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");
const deliveryAddressController = require("../delivery_address/delivery_address.controller");

const orderController = require("../order/order.controller");

router.use(auth.validateToken);

router.get(
  "/all",
  auth.restrictTo("administrator"),
  userController.getAllUsers
);

router.put("/", userController.updateUserPersonalInfo);

router.patch(
  "/changePassword",
  userController.validatePasswords,
  userController.updatePassword
);

router.patch("/disableMe", userController.disableMyAccount);

router.patch(
  "/activateAccount/:userId",
  auth.restrictTo("administrator"),
  userController.activateAccount
);
router.patch(
  "/blockAccount/:userId",
  auth.restrictTo("administrator"),
  userController.blockAccount
);

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

router.post(
  "/deliveryAddress",
  auth.validateToken,
  userController.addDeliveryAddress
);

router.patch(
  "/deliveryAddress/:deliveryAddressId",
  deliveryAddressController.changeAddressStatus
);

router.put(
  "/deliveryAddress/:deliveryAddressId",
  auth.validateToken,
  userController.updateDeliveryAddress
);

router.get("/orders", orderController.getUserOrders);

module.exports = router;
