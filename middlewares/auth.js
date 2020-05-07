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
    return res
      .status(403)
      .json({ message: "Acceso denegado", validated: false });
  }

  const token = req.headers.authorization.split(" ")[1];
  let payload = "";

  try {
    payload = jwt.decode(token, process.env.SECRET_TOKEN);
  } catch (error) {
    logger.error("Se proporcionó un token no válido como mecanismo de acceso");
    res.json({
      message: "Acceso denegado por token inválido",
      validated: false,
    });
    next(createError(500, "El token proporcionado no es válido"));
  }

  const tokenExp = new Date(payload.exp);
  const actualDate = new Date(moment());

  if (tokenExp <= actualDate) {
    return res
      .status(401)
      .json({ message: "Token expirado", validated: false });
  } else {
    logger.info("Se validó el token de acceso satisfactoriamente");
    req.user_id = payload.user_id;
    req.user_role = payload.user_role;
    res.json({ message: "Token válido", validated: true });
  }
  next();
}

function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user_role)) {
      logger.info(
        `Ruta no autorizada para el rol actual [ROL_NAME: ${req.user_role}]`
      );
      res.status(403).json({
        message: `Ruta no autorizada para el rol actual [ROL_NAME: ${req.user_role}]`,
        authorized: false,
      });
      return next(
        createError(
          403,
          `El rol actual no posee los permisos necesarios para realizar la acción [ROL_NAME: ${req.user_role}]`
        )
      );
    }
    next();
  };
}

module.exports = { createToken, validateToken, restrictTo };
