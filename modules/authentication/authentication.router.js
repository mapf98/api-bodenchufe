const express = require("express");
const router = express.Router();
const authenticationController = require("./authentication.controller");
const auth = require("../../middlewares/auth");

router.get("/token", authenticationController.getToken);
router.post("/token/validate", auth.validateToken);
router.post("/login", authenticationController.logIn);
router.post("/signUp", authenticationController.signUp);
router.get("/verifyEmail/:emailUser", authenticationController.verifyEmail);

module.exports = router;
