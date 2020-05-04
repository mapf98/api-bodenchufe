const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");
const auth = require("../../middlewares/auth");

router.put("/", auth.validateToken, categoryController.updateCategory);

module.exports = router;
