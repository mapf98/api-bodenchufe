const express = require("express");
const router = express.Router();
const offerController = require("./offer.controller");
const auth = require("../../middlewares/auth");

router.use("/", offerController.getAllOffers);

module.exports = router;
