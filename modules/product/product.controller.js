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
          `Error al obtener productos asociados a un proveedor (${products.message})`
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
  getProductsByOffer: async (req, res, next) => {
    let products = await productModel.getProductsByOffer(
      req.con,
      req.params.offerId
    );
    if (products instanceof Error) {
      logger.error("Error en modulo product (GET /offer/:offerId)");
      next(
        createError(
          500,
          `Error al obtener productos dada una oferta (${products.message})`
        )
      );
    } else {
      logger.info("Listado de productos por oferta");
      res.json({
        data: { products },
        results: products.length,
      });
    }
  },
  getProductsByCategory: async (req, res, next) => {
    let products = await productModel.getProductsByCategory(
      req.con,
      req.params.categoryId
    );
    if (products instanceof Error) {
      logger.error("Error en modulo product (GET /category/:categoryId)");
      next(
        createError(
          500,
          `Error al obtener productos por una categoría (${products.message})`
        )
      );
    } else {
      logger.info("Listado de productos por categoría");
      res.json({
        data: { products },
        results: products.length,
      });
    }
  },
};
