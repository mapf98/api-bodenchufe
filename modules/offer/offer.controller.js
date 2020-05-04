const createError = require("http-errors");
const offerModel = require("./offer.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllOffers: async (req, res, next) => {
    let offers = await offerModel.getAllOffers(req.con);
    if (offers instanceof Error) {
      logger.error("Error en modulo offer (GET /offer)");
      next(
        createError(500, `Error al obtener las ofertas (${offers.message})`)
      );
    } else {
      logger.info("Listado de ofertas por proveedor");
      res.json({
        data: { offers },
        results: offers.length,
      });
    }
  },
};
