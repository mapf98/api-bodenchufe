const logger = require("../config/logLevels");

function setLogRequest(req, res, next) {
  logger.info(req.method + " " + req.originalUrl);
  next();
}

module.exports = { setLogRequest };
