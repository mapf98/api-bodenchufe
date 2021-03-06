const express = require("express");
const router = express.Router();
const categoryRouter = require("./modules/category/category.router");
const couponRouter = require("./modules/coupon/coupon.router");
const deliveryAddressRouter = require("./modules/delivery_address/delivery_address.router");
const offerRouter = require("./modules/offer/offer.router");
const orderRouter = require("./modules/order/order.router");
const productRouter = require("./modules/product/product.router");
const providerRouter = require("./modules/provider/provider.router");
const settingRouter = require("./modules/setting/setting.router");
const userRouter = require("./modules/user/user.router");
const authenticationRouter = require("./modules/authentication/authentication.router");
const paymentRouter = require("./modules/payment/payment.router");
const languageRouter = require("./modules/language/language.router");

router.use("/category", categoryRouter);
router.use("/coupon", couponRouter);
router.use("/delivery-address", deliveryAddressRouter);
router.use("/offer", offerRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/provider", providerRouter);
router.use("/setting", settingRouter);
router.use("/user", userRouter);
router.use("/authentication", authenticationRouter);
router.use("/payment", paymentRouter);
router.use("/language", languageRouter);

module.exports = router;
