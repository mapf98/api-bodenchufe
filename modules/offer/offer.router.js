const express = require("express");
const router = express.Router();
const offerController = require("./offer.controller");

router.get("/", offerController.getAllOffers);

module.exports = router;
