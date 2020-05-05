const express = require("express");
const router = express.Router();
const authenticationController = require("./authentication.controller");
const auth = require("../../middlewares/auth");

//Rutas para prueba de autenticación
router.get("/token", authenticationController.getToken);
router.post("/token/validate", auth.validateToken);
router.post("/signUp", authenticationController.signUp);
module.exports = router;
