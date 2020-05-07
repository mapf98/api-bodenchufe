const createError = require("http-errors");
const settingModel = require("./setting.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllSettings: async (req, res, next) => {
    let result = await settingModel.getAllSettings(req.con);
    if (result instanceof Error) {
      logger.error(
        "Error en el módulo setting (GET /setting - getAllSettings())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener los parámetros generales (${result.message})`
        )
      );
    } else {
      logger.info("Lista de parámetros generales entregada satisfactoriamente");
      res.json({ settings: result, obtained: true });
    }
  },

  updateSettings: async (req, res, next) => {
    let result = await settingModel.updateSettings(req.con, req.body);
    if (result instanceof Error || result.rowCount == 0) {
      logger.error(
        "Error en el módulo setting (PUT /setting - updateSettings())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al actualizar los parámetros generales (${result.message})`
        )
      );
    } else {
      logger.info(
        "Los parámetros generales fueron actualizados satisfactoriamente"
      );
      res.json({ obtained: true });
    }
  },
};
