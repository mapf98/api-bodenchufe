const createError = require("http-errors");
const couponModel = require("./coupon.model");
const logger = require("../../config/logLevels");

module.exports = {
  getCoupons: async (req, res, next) => {
    let result = await couponModel.getCoupons(req.con);
    if (result instanceof Error) {
      logger.error("Error en el modulo coupon (getCoupons)");
      next(
        createError(
          500,
          `Error al obtener los cupones disponibles (${result.message})`
        )
      );
    } else {
      logger.info("Lista de cupones obtenida satisfactoriamente");
      res.json(result);
    }
  },

  addCoupon: async (req, res, next) => {
    let result = await couponModel.addCoupon(req.con, req.body);
    if (result instanceof Error) {
      logger.error("Error en el modulo coupon (addCoupon)");
      next(
        createError(
          500,
          `Error al obtener los cupones disponibles (${result.message})`
        )
      );
    } else {
      logger.info("Cupon agregado correctamente");
      res.json({ status: 200 });
    }
  },
};
