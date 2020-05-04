const createError = require("http-errors");
const productModel = require("./product.model");
const logger = require("../../config/logLevels");

module.exports = {
  getProductsByProvider: async (req, res, next) => {
    let products = await productModel.getProductsByProvider(
      req.con,
      req.params.providerId
    );
    if (products instanceof Error) {
      logger.error("Error en modulo product (GET /provider/:providerId)");
      next(
        createError(
          500,
          `Error al obtener productos por asociados a un proveedor (${products.message})`
        )
      );
    } else {
      logger.info("Listado de productos por proveedor");
      res.json({
        data: { products },
        results: products.length,
      });
    }
  },
};
