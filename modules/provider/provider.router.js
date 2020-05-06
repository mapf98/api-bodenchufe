const express = require("express");
const router = express.Router();
const providerController = require("./provider.controller");
const auth = require("../../middlewares/auth");

router.get("/main", providerController.getMainProviders);
router.get("/", auth.validateToken, providerController.getAllProviders);
router.post("/", auth.validateToken, providerController.createProvider);
router.put(
  "/status",
  auth.validateToken,
  providerController.updateStatusProvider
);

module.exports = router;
