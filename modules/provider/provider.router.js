const express = require("express");
const router = express.Router();
const providerController = require("./provider.controller");
const auth = require("../../middlewares/auth");

router.get("/main", providerController.getMainProviders);
router.get(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  providerController.getAllProviders
);
router.post(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  providerController.createProvider
);
router.patch(
  "/status",
  auth.validateToken,
  auth.restrictTo("administrator"),
  providerController.updateStatusProvider
);
router.put(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  providerController.updateProvider
);
router.patch(
  "/product/status",
  auth.validateToken,
  auth.restrictTo("administrator"),
  providerController.updateStatusProductProvider
);
router.patch(
  "/product",
  auth.validateToken,
  auth.restrictTo("administrator"),
  providerController.updateProductProvider
);

module.exports = router;
