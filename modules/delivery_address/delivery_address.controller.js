const createError = require("http-errors");
const deliveryAddressModel = require("./delivery_address.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllDeliveryAddresses: async (req, res, next) => {
    let adresses = await deliveryAddressModel.getDeliveryAddresses(req);
    if (adresses instanceof Error) {
      logger.error(
        "Error en módulo delivery_address (GET /delivery_address - getAllDeliveryAddresses())"
      );
      res.json({ obtained: false });
      return next(
        createError(
          500,
          `Error al obtener las direcciones de entrega para un usuario [USER_ID: ${req.user_id}] (${adresses.message})`
        )
      );
    }
    logger.info(
      `Direcciones de entrega del usuario presentadas satisfactoriamente [USER_ID: ${req.user_id}]`
    );
    res.json({
      adresses: adresses,
      results: adresses.length,
      obtained: true,
    });
  },
  changeAddressStatus: async (req, res, next) => {
    let adresses = await deliveryAddressModel.updateAddressStatus(req);
    if (adresses instanceof Error || adresses.rowCount == 0) {
      logger.error(
        "Error en módulo user (PATCH /deliveryAddress/:deliveryAddressId - changeAddressStatus())"
      );
      res.json({ updated: false });
      return next(
        createError(
          500,
          `Error al cambiar el status de una dirección de entrega [DELIVERY_ADDRESS: ${req.params.deliveryAddressId}] (${adresses.message})`
        )
      );
    }
    logger.info(
      `Se cambió el estatus de la dirección satisfactoriamente [DELIVERY_ADDRESS: ${req.params.deliveryAddressId} | STATUS_NAME: ${req.body.status_name}]`
    );
    res.json({ updated: true });
  },
};
