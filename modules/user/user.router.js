const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");

router.get("/all", userController.getAllUsers);

module.exports = router;
