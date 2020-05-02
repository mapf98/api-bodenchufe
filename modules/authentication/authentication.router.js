const express = require("express");
const router = express.Router();
const authenticationController = require("./authentication.controller");
const auth = require("../../middlewares/auth");

//Rutas para prueba de autenticación
router.get("/token", authenticationController.getToken);
router.post("/token/validate", auth.validateToken, (req, res, next) => {
  res.send("Se ha validado el Token proporcionado");
});

module.exports = router;
