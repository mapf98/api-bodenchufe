const express = require("express");
const router = express.Router();
const couponController = require("./coupon.controller");
const auth = require("../../middlewares/auth");

router.get("/", auth.validateToken, couponController.getCoupons);
router.put("/", auth.validateToken, couponController.updateCoupon);

module.exports = router;
