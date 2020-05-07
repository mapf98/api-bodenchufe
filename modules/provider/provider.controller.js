const createError = require("http-errors");
const providerModel = require("./provider.model");
const logger = require("../../config/logLevels");

module.exports = {
  getMainProviders: async (req, res, next) => {
    let providers = await providerModel.getMainProviders(req.con);

    if (providers instanceof Error) {
      logger.error(
        "Error en el módulo provider (GET /provider/main - getMainProviders())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener los proveedores (${providers.message})`
        )
      );
    } else {
      logger.info("Listado de proveedores obtenido satisfactoriamente");
      res.json({ providers: providers, obtained: true });
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
      logger.error(
        "Error en el módulo provider (GET /provider - getAllProviders)"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener los proveedores para el back-office (${providers.message})`
        )
      );
    } else {
      logger.info(
        "Listado de proveedores para el back-office obtenida satisfactoriamente"
      );
      res.json({ providers: providersResume, obtained: true });
    }
  },
  createProvider: async (req, res, next) => {
    let provider = await providerModel.createProvider(req.con, req.body);

    if (provider instanceof Error) {
      logger.error(
        "Error en el módulo provider (POST /provider - createProvider())"
      );
      res.json({ created: false });
      next(
        createError(
          500,
          `Error al crear un proveedor [PROVIDER_NAME: ${req.body.provider_name}] (${provider.message})`
        )
      );
    } else {
      logger.info(
        `Proveedor creado satisfactoriamente [PROVIDER_NAME: ${req.body.provider_name} | PROVIDER_ID: ${provider[0].provider_id}]`
      );
      res.json({ created: true });
    }
  },
  updateStatusProvider: async (req, res, next) => {
    let provider = await providerModel.updateStatusProvider(req.con, req.body);

    if (provider instanceof Error || provider.rowCount == 0) {
      logger.error(
        "Error en el modulo provider (PATCH /provider/status - updateStatusProvider())"
      );
      res.json({ updated: false });
      next(
        createError(
          500,
          `Error al modificar el estatus de un proveedor [PROVIDER_ID: ${
            req.body.provider_id
          }] (${
            provider.message !== undefined
              ? provider.message
              : `No se efectuaron cambios sobre el estatus de un proveedor [PROVIDER_ID: ${req.body.provider_id}]`
          })`
        )
      );
    } else {
      logger.info(
        `Estatus de proveedor cambiado satisfactoriamente [PROVIDER_ID: ${req.body.provider_id}]`
      );
      res.json({ updated: true });
    }
  },
  updateProvider: async (req, res, next) => {
    let provider = await providerModel.updateProvider(req.con, req.body);

    if (provider instanceof Error || provider.rowCount == 0) {
      logger.error(
        "Error en el módulo provider (PUT /provider - updateProvider())"
      );
      res.json({ updated: false });
      next(
        createError(
          500,
          `Error al modificar información de un proveedor [PROVIDER_ID: ${
            req.body.provider_id
          }] (${
            provider.message !== undefined
              ? provider.message
              : `No se efectuaron cambios en el proveedor [PROVIDER_ID: ${req.body.provider_id}]`
          })`
        )
      );
    } else {
      logger.info(
        `Información de un proveedor cambiada satisfactoriamente [PROVIDER_ID: ${req.body.provider_id}]`
      );
      res.json({ updated: true });
    }
  },
  updateStatusProductProvider: async (req, res, next) => {
    let provider = await providerModel.updateStatusProductProvider(
      req.con,
      req.body
    );

    if (provider instanceof Error || provider.rowCount == 0) {
      logger.error(
        "Error en el módulo provider (PATCH /provider/product/status - updateStatusProductProvider())"
      );
      res.json({ updated: false });
      next(
        createError(
          500,
          `Error al modificar el estatus de un producto de un proveedor [PRODUCT_PROVIDER_ID: ${
            req.body.post_id
          }] (${
            provider.message !== undefined
              ? provider.message
              : `No se efectuaron cambios en el estatus de un producto asociado a un proveedor [PRODUCT_PROVIDER_ID: ${req.body.post_id}]`
          })`
        )
      );
    } else {
      logger.info(
        `Estatus de un producto asociado a un proveedor actualizado satisfactoriamente [PRODUCT_PROVIDER_ID: ${req.body.post_id} | PRODUCT_PROVIDER_STATUS_NAME: ${req.body.status_name}]`
      );
      res.json({ updated: true });
    }
  },
  updateProductProvider: async (req, res, next) => {
    let provider = await providerModel.updateProductProvider(req.con, req.body);

    if (provider instanceof Error || provider.rowCount == 0) {
      logger.error(
        "Error en el módulo provider (PATCH /provider/product - updateProductProvider())"
      );
      res.json({ updated: false });
      next(
        createError(
          500,
          `Error al modificar la información de un producto asociado a un proveedor [PRODUCT_PROVIDER_ID: ${
            req.body.post_id
          }] (${
            provider.message !== undefined
              ? provider.message
              : `No se efectuaron cambios en un producto asociado a un proveedor [PRODUCT_PROVIDER_ID: ${req.body.post_id}]`
          })`
        )
      );
    } else {
      logger.info(
        `Se modificó satisfactoriamente la informacion de un producto asociado a un proveedor [PRODUCT_PROVIDER_ID: ${req.body.post_id}]`
      );
      res.json({ updated: true });
    }
  },
};
