const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const auth = require("../../middlewares/auth");

router.use("/provider/:providerId", productController.getProductsByProvider);

module.exports = router;
