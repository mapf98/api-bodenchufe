const jwt = require("jwt-simple");
const moment = require("moment");
const createError = require("http-errors");
const logger = require("../config/logLevels");

function createToken(user) {
  const payload = {
    user_id: user.user_id,
    user_role: user.rol_name,
    iat: moment(),
    exp: moment().add(1, "day"),
  };

  return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function validateToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Acceso denegado" });
  }

  const token = req.headers.authorization.split(" ")[1];
  let payload = "";

  try {
    payload = jwt.decode(token, process.env.SECRET_TOKEN);
  } catch (error) {
    logger.error("Se proporcionó un token no válido como mecanismo de acceso");
    next(createError(500, "El token proporcionado no es válido"));
  }

  const tokenExp = new Date(payload.exp);
  const actualDate = new Date(moment());

  if (tokenExp <= actualDate) {
    return res.status(401).send({ message: "Token expirado" });
  } else {
    logger.info("Se validó el token de acceso");
    req.user_id = payload.user_id;
    req.user_role = payload.user_role;
  }
  next();
}

function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user_role)) {
      res.status(403).json({ message: "No authorized" });
      return next(
        createError(403, "No posees permisos para realizar esta accion")
      );
    }
    next();
  };
}

module.exports = { createToken, validateToken, restrictTo };
