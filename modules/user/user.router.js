const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");
const deliveryAddressController = require("../delivery_address/delivery_address.controller");
const productController = require("../product/product.controller");
const orderController = require("../order/order.controller");

router.put("/photo", userController.setUserPhoto);
router.put(
  "/deliveryAddress/:deliveryAddressId",
  auth.validateToken,
  userController.updateDeliveryAddress
);
router.use(auth.validateToken);

router.get(
  "/all",
  auth.restrictTo("administrator"),
  userController.getAllUsers
);

router.get("/", userController.getUserById);

router.put("/", userController.updateUserPersonalInfo);

router.put("/language", userController.updateLanguage);

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

router.delete(
  "/shoppingCart/:shoppingCartId",
  userController.deleteShoppingCartProduct
);

router.patch(
  "/shoppingCart/:shoppingCartId/quantity",
  userController.checkProductAvailability,
  userController.updateProductQuantity
);

router.patch(
  "/shoppingCart/:shoppingCartId/status",
  userController.changeShoppingCartStatus
);

router.get("/shoppingCart/checkout", userController.orderCheckout);

router.get(
  "/product/:productProviderId/checkQualification",
  productController.checkProductAlreadyRated
);

router.post(
  "/product/:productProviderId/qualification",
  productController.purchasedProductsOfUser,
  productController.rateProduct
);

router.get(
  "/deliveryAddress",
  deliveryAddressController.getAllDeliveryAddresses
);

router.post("/deliveryAddress", userController.addDeliveryAddress);

router.patch(
  "/deliveryAddress/:deliveryAddressId",
  deliveryAddressController.changeAddressStatus
);

router.get("/orders", orderController.getUserOrders);
router.get("/coupon", userController.getUserCoupons);
router.get("/order/coupon/:orderPrice", userController.getUserCouponsForOrders);

module.exports = router;
