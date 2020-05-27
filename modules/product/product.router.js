const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const auth = require("../../middlewares/auth");

router.get("/provider/:providerId", productController.getProductsByProvider);
router.get("/offer/:offerId", productController.getProductsByOffer);
router.get("/category/:categoryId", productController.getProductsByCategory);
router.get("/:postId", productController.getProductDetail);
router.get("/search/:keyword", productController.getProductsByKeyword);
router.get(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  productController.getAllProducts
);
router.put(
  "/photo",
  auth.validateToken,
  auth.restrictTo("administrator"),
  productController.updateProductPhoto
);
router.post(
  "/",
  auth.validateToken,
  auth.restrictTo("administrator"),
  productController.createPost
);

module.exports = router;
