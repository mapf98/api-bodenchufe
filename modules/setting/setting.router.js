const express = require("express");
const router = express.Router();
const settingController = require("./setting.controller");
const auth = require("../../middlewares/auth");

router.get(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  settingController.getAllSettings
);
router.put(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  settingController.updateSettings
);

module.exports = router;
