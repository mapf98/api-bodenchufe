const createError = require("http-errors");
const settingModel = require("./setting.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllSettings: async (req, res, next) => {
    let result = await settingModel.getAllSettings(req.con);
    if (result instanceof Error) {
      logger.error("Error en el modulo Setting (getAllSettings)");
      next(createError(500, "Error en el modulo Setting (getAllSettings)"));
    } else {
      logger.info("Lista de configuraciones entregada");
      res.json(result);
    }
  },
};
