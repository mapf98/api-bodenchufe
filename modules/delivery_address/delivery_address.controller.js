const createError = require("http-errors");
const deliveryAddressModel = require("./delivery_address.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllDeliveryAddresses: async (req, res, next) => {
    let adresses = await deliveryAddressModel.getDeliveryAddresses(req);
    if (adresses instanceof Error) {
      logger.error("Error en modulo delivery_address (GET /)");
      return next(
        createError(
          500,
          `Error al obtener las direcciones de envio (${adresses.message})`
        )
      );
    }
    logger.info("Lista de direcciones de envio entregadas");
    res.json({
      results: adresses.length,
      data: { adresses },
    });
  },
};
