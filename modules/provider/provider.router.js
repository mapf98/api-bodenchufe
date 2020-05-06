const express = require("express");
const router = express.Router();
const providerController = require("./provider.controller");
const auth = require("../../middlewares/auth");

router.get("/main", providerController.getMainProviders);
router.get("/", auth.validateToken, providerController.getAllProviders);
router.post("/", auth.validateToken, providerController.createProvider);
router.patch(
  "/status",
  auth.validateToken,
  providerController.updateStatusProvider
);
router.put("/", auth.validateToken, providerController.updateProvider);
router.patch(
  "/product",
  auth.validateToken,
  providerController.updateProductProvider
);

module.exports = router;
