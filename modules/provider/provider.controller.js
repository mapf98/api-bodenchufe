const createError = require("http-errors");
const providerModel = require("./provider.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllProviders: async (req, res, next) => {
    let providers = await providerModel.getAllProviders(req.con);

    if (providers instanceof Error) {
      logger.error("Error en el modulo provider (getAllProviders)");
      next(
        createError(
          500,
          `Error al obtener los proveedores (${providers.message})`
        )
      );
    } else {
      logger.info("Lista de proveedores obtenida satisfactoriamente");
      res.json(providers);
    }
  },
};
