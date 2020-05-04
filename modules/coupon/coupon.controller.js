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

  disableCoupon: async (req, res, next) => {
    let result = await couponModel.disableCoupon(req.con, req.body);
    if (result instanceof Error) {
      logger.error("Error en el modulo coupon (disableCoupons)");
      next(
        createError(500, `Error al deshabilitar el cupon (${result.message})`)
      );
    } else {
      logger.info("cupon deshabilitado satisfactoriamente");
      res.json({ status: 200 });
    }
  },
};
