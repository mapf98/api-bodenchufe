const express = require("express");
const router = express.Router();
const settingController = require("./setting.controller");
const auth = require("../../middlewares/auth");

router.get('/', auth.validateToken,settingController.getAllSettings);

module.exports = router;
