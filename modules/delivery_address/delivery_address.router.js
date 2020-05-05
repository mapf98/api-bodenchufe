const express = require("express");
const router = express.Router();
const deliveryAddressController = require("./delivery_address.controller");
const auth = require("../../middlewares/auth");

router.get("/", deliveryAddressController.getAllDeliveryAddresses);

module.exports = router;
