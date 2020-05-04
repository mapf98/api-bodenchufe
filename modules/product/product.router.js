const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const auth = require("../../middlewares/auth");

router.use("/category/:categoryId", productController.getProductsByCategory);

module.exports = router;
