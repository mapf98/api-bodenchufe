const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const auth = require("../../middlewares/auth");

module.exports = router;
