const createError = require("http-errors");
const productModel = require("./product.model");
const logger = require("../../config/logLevels");

module.exports = {
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
