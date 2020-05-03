const createError = require("http-errors");
const settingModel = require("./setting.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllSettings: async (req, res, next) => {
    let result = await settingModel.getAllSettings(req.con);
    if (result instanceof Error) {
      logger.error("Error en el modulo Setting (getAllSettings)");
      next(
        createError(
          500,
          `Error al obtener los parametros globales (${result.message})`
        )
      );
    } else {
      logger.info("Lista de configuraciones entregada");
      res.json(result);
    }
  },

  updateSettings: async (req, res, next) => {
    let result = await settingModel.updateSettings(req.con, req.body);
    if (result instanceof Error) {
      logger.error("Error en el modulo Setting (updateSettings)");
      next(
        createError(
          500,
          `Error al actualizar los parametros globales (${result.message})`
        )
      );
    } else {
      logger.info(
        "los parametros globales han sido actualizados correctamente"
      );
      res.json({
        status: 200,
      });
    }
  },
};
