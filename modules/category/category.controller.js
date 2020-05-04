const createError = require("http-errors");
const categoryModel = require("./category.model");
const logger = require("../../config/logLevels");

module.exports = {
  getMainCategories: async (req, res, next) => {
    let results = await categoryModel.getMainCategories(req.con);

    if (results instanceof Error) {
      logger.error("Error en el modulo category (getMainCategories)");
      next(
        createError(
          500,
          `Error al obtener las categorias padres (${results.message})`
        )
      );
    } else {
      logger.info("Lista de categorias padre obtenida satisfactoriamente");
      res.json(results);
    }
  },
};
