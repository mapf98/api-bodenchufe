const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const auth = require("../../middlewares/auth");

router.get("/provider/:providerId", productController.getProductsByProvider);
router.get("/offer/:offerId", productController.getProductsByOffer);
router.get("/category/:categoryId", productController.getProductsByCategory);
router.get("/:postId", productController.getProductDetail);
router.get("/", auth.validateToken, productController.getAllProducts);

module.exports = router;
