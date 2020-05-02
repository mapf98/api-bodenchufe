require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");
const midDB = require("./middlewares/midDB");
const logRequest = require("./middlewares/logRequest");
const parseRequest = require("./middlewares/parseRequestBody");

//Se habilita el cors para interaccion con otras aplicaciones
app.use(cors());

//Configuracion de elementos de seguridad y optimizacion
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Coneccion a la BD incluida en el req de cada consulta y Logger de peticiones a la API
app.use(
  midDB.setDBConnection,
  parseRequest.parseBody,
  logRequest.setLogRequest
);

//Router general de la API o prefijo global
app.use("/bodenchufe/api", router);

module.exports = app;
