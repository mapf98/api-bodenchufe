const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");
const auth = require("../../middlewares/auth");

router.put("/", auth.validateToken, categoryController.updateCategory);
router.get("/main", categoryController.getMainCategories);
router.post("/", auth.validateToken, categoryController.createCategory);
router.get("/", categoryController.getAllCategories);

module.exports = router;
