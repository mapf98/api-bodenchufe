const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const auth = require("../../middlewares/auth");

router.get(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  orderController.getAllOrders
);

module.exports = router;
