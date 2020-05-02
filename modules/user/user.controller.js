const createError = require("http-errors");
const userModel = require("./user.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllUsers: async (req, res, next) => {
    let results = await userModel.getAllUsers(req.con);
    if (results instanceof Error) {
      logger.error("Error en modulo user (GET /all)");
      next(createError(500, "Error al obtener todos los usuarios"));
    } else {
      logger.info("Lista general de usuarios entregada");
      res.json(results);
    }
  },
};
