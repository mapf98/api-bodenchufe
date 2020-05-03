const express = require("express");
const router = express.Router();
const settingController = require("./setting.controller");
const auth = require("../../middlewares/auth");
const snakeCase = require("../../middlewares/parseRequestBody");

router.get("/", auth.validateToken, settingController.getAllSettings);
router.put("/", auth.validateToken, settingController.updateSettings);
module.exports = router;
