const createError = require("http-errors");
const categoryModel = require("./category.model");
const logger = require("../../config/logLevels");

module.exports = {
  updateCategory: async (req, res, next) => {
    let result = await categoryModel.updateCategory(req.con, req.body);
    if (result instanceof Error) {
      logger.error("Error en el modulo category (updateCategory)");
      next(
        createError(500, `Error al actualizar la categoria (${result.message})`)
      );
    } else {
      logger.info("Categoria actualizada correctamente");
      res.json({ status: 200 });
    }
  },
};
