const createError = require("http-errors");
const couponModel = require("./coupon.model");
const logger = require("../../config/logLevels");

module.exports = {
  getCoupons: async (req, res, next) => {
    let coupons = await couponModel.getCoupons(req.con);
    if (coupons instanceof Error) {
      logger.error("Error en el módulo coupon (GET /coupon - getCoupons())");
      res.json({ obtained: false });
      next(
        createError(500, `Error al obtener los cupones (${coupons.message})`)
      );
    } else {
      logger.info("Listado de cupones obtenido satisfactoriamente");
      res.json({
        coupons: coupons,
        results: coupons.length,
        obtained: true,
      });
    }
  },
  updateCoupon: async (req, res, next) => {
    let coupon = await couponModel.updateCoupon(req.con, req.body);

    if (coupon instanceof Error || coupon.rowCount == 0) {
      logger.error("Error en el módulo coupon (PUT /coupon - updateCoupon())");
      res.json({ updated: false });
      next(
        createError(
          500,
          `Error al actualizar un cupón [COUPON_ID: ${req.body.coupon_id}] (${coupon.message})`
        )
      );
    } else {
      logger.info(
        `Cupón actualizado satisfactoriamente [COUPON_ID: ${req.body.coupon_id}]`
      );
      res.json({ updated: true });
    }
  },
  disableCoupon: async (req, res, next) => {
    let coupon = await couponModel.disableCoupon(req.con, req.body);

    if (coupon instanceof Error || coupon.rowCount == 0) {
      logger.error(
        "Error en el módulo coupon (PATCH /coupon/status - disableCoupons())"
      );
      res.json({ updated: false });
      next(
        createError(
          500,
          `Error al deshabilitar el cupón [COUPON_ID: ${req.body.coupon_id}] (${coupon.message})`
        )
      );
    } else {
      logger.info(
        `Cupón deshabilitado satisfactoriamente [COUPON_ID: ${req.body.coupon_id}]`
      );
      res.json({ updated: true });
    }
  },
  addCoupon: async (req, res, next) => {
    let result = await couponModel.addCoupon(req.con, req.body);
    if (result instanceof Error) {
      logger.error("Error en el módulo coupon (POST /coupon - addCoupon())");
      res.json({ created: false });
      next(
        createError(
          500,
          `Error al agregar un cupón [COUPON_NAME: ${req.body.coupon_name}] (${result.message})`
        )
      );
    } else {
      logger.info(
        `Cupón agregado satisfactoriamente [COUPON_NAME: ${req.body.coupon_name}]`
      );
      res.json({ created: true });
    }
  },
};
