const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");

router.get("/all", userController.getAllUsers);
router.get("/shoppingCart", auth.validateToken, userController.getShoppingCart);

module.exports = router;
