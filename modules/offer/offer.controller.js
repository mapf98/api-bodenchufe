const createError = require("http-errors");
const offerModel = require("./offer.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllOffers: async (req, res, next) => {
    let offers = await offerModel.getAllOffers(req.con);
    if (offers instanceof Error) {
      logger.error("Error en módulo offer (GET /offer - getAllOffers())");
      res.json({ obtained: false });
      next(
        createError(500, `Error al obtener las ofertas (${offers.message})`)
      );
    } else {
      logger.info("Listado de ofertas entregado satisfactoriamente");
      res.json({
        offers: offers,
        results: offers.length,
        obtained: true,
      });
    }
  },
};
