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
  getMainCategories: async (req, res, next) => {
    let categories = await categoryModel.getMainCategories(req.con);

    if (categories instanceof Error) {
      logger.error(
        `Error en el módulo category (GET /category/main - getMainCategories())`
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener las categorías principales (${categories.message})`
        )
      );
    } else {
      logger.info(
        "Listado de categorías principales obtenido satisfactoriamente"
      );
      res.json({
        categories: categories,
        results: categories.length,
        obtained: true,
      });
    }
  },
  getAllCategories: async (req, res, next) => {
    let categories = await categoryModel.getAllCategories(req.con);
    let allCategories = [];
    if (categories instanceof Error) {
      logger.error(
        "Error en módulo category (GET /category - getAllCategories())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener las categorías (${categories.message})`
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
      logger.info("Listado de categorías entregado satisfactoriamente");
      res.json({
        categories: allCategories,
        results: categories.length,
        obtained: false,
      });
    }
  },
  createCategory: async (req, res, next) => {
    let result = await categoryModel.createCategory(req.con, req.body);
    if (result instanceof Error) {
      logger.error(
        "Error en el módulo category (POST /category - createCategory())"
      );
      res.json({ created: false });
      next(
        createError(
          500,
          `Ha ocurrido un error al crear una categoría [CATEGORY: ${req.body.category_name}] (${result.message})`
        )
      );
    } else {
      logger.info(
        `Categoría creada satisfactoriamente [CATEGORY: ${req.body.category_name}] `
      );
      res.json({ created: true });
    }
  },
  updateCategory: async (req, res, next) => {
    let result = await categoryModel.updateCategory(req.con, req.body);
    if (result instanceof Error) {
      logger.error(
        "Error en el módulo category (PUT /category - updateCategory())"
      );
      res.json({ updated: true });
      next(
        createError(
          500,
          `Error al actualizar la categoría [CATEGORY_ID: ${req.body.category_id} | CATEGORY: ${req.body.category_name}] (${result.message})`
        )
      );
    } else {
      logger.info(
        `Categoría actualizada satisfactoriamente [CATEGORY_ID: ${req.body.category_id} | CATEGORY: ${req.body.category_name}]`
      );
      res.json({ updated: true });
    }
  },
};
