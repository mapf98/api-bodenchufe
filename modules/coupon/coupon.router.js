const express = require("express");
const router = express.Router();
const couponController = require("./coupon.controller");
const auth = require("../../middlewares/auth");

router.get("/", auth.validateToken, couponController.getCoupons);
router.post("/", auth.validateToken, couponController.addCoupon);
router.put("/", auth.validateToken, couponController.updateCoupon);
router.patch("/status", auth.validateToken, couponController.disableCoupon);

module.exports = router;
