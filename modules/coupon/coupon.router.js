const express = require("express");
const router = express.Router();
const couponController = require("./coupon.controller");
const auth = require("../../middlewares/auth");

router.get("/", auth.validateToken, couponController.getCoupons);
router.patch("/status", auth.validateToken, couponController.disableCoupon);

module.exports = router;
