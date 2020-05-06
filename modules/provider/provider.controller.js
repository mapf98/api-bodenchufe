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
  updateStatusProvider: async (req, res, next) => {
    let provider = await providerModel.updateStatusProvider(req.con, req.body);

    if (provider instanceof Error || provider.rowCount == 0) {
      logger.error("Error en el modulo provider (PATCH /provider/status)");
      next(
        createError(
          500,
          `Error al modificar el estatus de un proveedor (${
            provider.message !== undefined
              ? provider.message
              : "No se efectuaron cambios"
          })`
        )
      );
    } else {
      logger.info("Estatus de proveedor cambiado satisfactoriamente");
      res.json({ status: 200, updated: true });
    }
  },
  updateProvider: async (req, res, next) => {
    let provider = await providerModel.updateProvider(req.con, req.body);

    if (provider instanceof Error || provider.rowCount == 0) {
      logger.error("Error en el modulo provider (PUT /provider)");
      next(
        createError(
          500,
          `Error al modificar informacion de un proveedor (${
            provider.message !== undefined
              ? provider.message
              : "No se efectuaron cambios"
          })`
        )
      );
    } else {
      logger.info("Informacion de un proveedor cambiada satisfactoriamente");
      res.json({ status: 200, updated: true });
    }
  },
  updateStatusProductProvider: async (req, res, next) => {
    let provider = await providerModel.updateStatusProductProvider(
      req.con,
      req.body
    );

    if (provider instanceof Error || provider.rowCount == 0) {
      logger.error(
        "Error en el modulo provider (PATCH /provider/product/status)"
      );
      next(
        createError(
          500,
          `Error al modificar el estatus de un producto de un proveedor (${
            provider.message !== undefined
              ? provider.message
              : "No se efectuaron cambios"
          })`
        )
      );
    } else {
      logger.info("Estatus de un producto asociado a un proveedor actualizado");
      res.json({ status: 200, updated: true });
    }
  },
};
