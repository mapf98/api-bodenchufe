const express = require("express");
const router = express.Router();
const providerController = require("./provider.controller");
const auth = require("../../middlewares/auth");

router.get("/main", providerController.getMainProviders);
router.get("/", auth.validateToken, providerController.getAllProviders);

module.exports = router;
