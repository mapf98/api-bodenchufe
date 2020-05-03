const express = require("express");
const router = express.Router();
const couponController = require("./coupon.controller");
const auth = require("../../middlewares/auth");

router.get("/", couponController.getCoupons);

module.exports = router;
