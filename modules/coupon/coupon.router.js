const express = require("express");
const router = express.Router();
const couponController = require("./coupon.controller");
const auth = require("../../middlewares/auth");

router.get("/", auth.validateToken, couponController.getCoupons);
router.post("/", auth.validateToken, couponController.addCoupon);

module.exports = router;
