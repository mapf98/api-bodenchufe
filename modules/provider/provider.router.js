const express = require("express");
const router = express.Router();
const providerController = require("./provider.controller");
const auth = require("../../middlewares/auth");

router.get("/", providerController.getAllProviders);
router.post("/", auth.validateToken, providerController.createProvider);

module.exports = router;
