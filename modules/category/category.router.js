const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");
const auth = require("../../middlewares/auth");

router.put(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  categoryController.updateCategory
);
router.get("/main", categoryController.getMainCategories);
router.post(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategories);

module.exports = router;
