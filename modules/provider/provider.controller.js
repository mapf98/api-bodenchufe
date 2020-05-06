const createError = require("http-errors");
const providerModel = require("./provider.model");
const logger = require("../../config/logLevels");

module.exports = {
  getMainProviders: async (req, res, next) => {
    let providers = await providerModel.getMainProviders(req.con);

    if (providers instanceof Error) {
      logger.error("Error en el modulo provider (getMainProviders)");
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
  getAllProviders: async (req, res, next) => {
    let providersResume = [];
    let providers = await providerModel.getAllProviders(req.con);

    for (let index = 0; index < providers.length; index++) {
      let products = await providerModel.getProvidersProducts(
        req.con,
        providers[index].provider_id
      );
      providersResume.push({
        provider: providers[index],
        posts: products,
      });
    }

    if (providers instanceof Error) {
      logger.error("Error en el modulo provider (getAllProviders)");
      next(
        createError(
          500,
          `Error al obtener los proveedores para el admin (${providers.message})`
        )
      );
    } else {
      logger.info(
        "Lista de proveedores para admin obtenida satisfactoriamente"
      );
      res.json(providersResume);
      }
  },
  createProvider: async (req, res, next) => {
    let provider = await providerModel.createProvider(req.con, req.body);

    if (provider instanceof Error) {
      logger.error("Error en el modulo provider (POST /provider)");
      next(
        createError(500, `Error al crear un proveedor (${provider.message})`)
      );
    } else {
      logger.info("Proveedor creado satisfactoriamente");
      res.json({ status: 200, created: true });
    }
  },
};
