const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");
const auth = require("../../middlewares/auth");

router.post("/", auth.validateToken, categoryController.createCategory);

module.exports = router;
