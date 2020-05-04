const createError = require("http-errors");
const categoryModel = require("./category.model");
const logger = require("../../config/logLevels");

function getCategories(category_id, results) {
  let categoryResult = [];
  results.forEach((category) => {
    if (category.fk_category_id == category_id) {
      categoryResult.push({
        category_id: category.category_id,
        category_name: category.category_name,
        category_child: getCategories(category.category_id, results),
      });
    }
  });
  return categoryResult;
}

module.exports = {
  getAllCategories: async (req, res, next) => {
    let categories = await categoryModel.getAllCategories(req.con);
    let allCategories = [];
    if (categories instanceof Error) {
      logger.error("Error en modulo category (GET /category/)");
      next(
        createError(
          500,
          `Error al obtener las categorias (${categories.message})`
        )
      );
    } else {
      categories.forEach((category) => {
        if (category.fk_category_id === null) {
          allCategories.push({
            category_id: category.category_id,
            category_name: category.category_name,
            category_child: getCategories(category.category_id, categories),
          });
        }
      });
      logger.info("Listado de categorias entregado");
      res.json({
        data: { allCategories },
      });
    }
  },
};
