const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");
const auth = require("../../middlewares/auth");

router.get("/main", categoryController.getMainCategories);

module.exports = router;
