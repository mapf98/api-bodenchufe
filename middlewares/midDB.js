const connectionBD = require("../config/db");

function setDBConnection(req, res, next) {
  try {
    req.con = connectionBD;
  } catch (error) {
    logger.error(
      "Hubo un problema con la conexión a la BD, verificar archivos de configuración"
    );
    next(createError(500, "No se pudo establecer la conexión con BD"));
  }
  next();
}

module.exports = { setDBConnection };
