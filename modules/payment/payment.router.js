const express = require("express");
const router = express.Router();
const paymentController = require("./payment.controller");
const auth = require("../../middlewares/auth");
const bodyParser = require("body-parser");

router.post(
  "/paymentWebHook",
  bodyParser.raw({ type: "application/json" }),
  paymentController.paymentWebHook
);

router.use(auth.validateToken);
router.post(
  "/payOrder",
  paymentController.createOrder,
  paymentController.payOrder
);

router.get("/paymentDetail", paymentController.paymentDetail);

module.exports = router;
