const express = require("express");
const router = express.Router();
const couponController = require("./coupon.controller");
const auth = require("../../middlewares/auth");

router.get(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  couponController.getCoupons
);
router.post(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  couponController.addCoupon
);
router.put(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  couponController.updateCoupon
);
router.patch(
  "/status",
  auth.validateToken,
  auth.restrictTo("administrator"),
  couponController.disableCoupon
);

module.exports = router;
