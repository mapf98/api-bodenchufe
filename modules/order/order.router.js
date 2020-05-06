const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const auth = require("../../middlewares/auth");

router.get("/", auth.validateToken, orderController.getAllOrders);

module.exports = router;
