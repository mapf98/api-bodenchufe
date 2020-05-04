const createError = require("http-errors");
const categoryModel = require("./category.model");
const logger = require("../../config/logLevels");

module.exports = {
  createCategory: async (req, res, next) => {
    let result = await categoryModel.createCategory(req.con, req.body);

    if (result instanceof Error) {
      logger.error("Error en el modulo category (createCategory)");
      next(
        createError(
          500,
          `Ha ocurrido un error al crear la categoria (${result.message})`
        )
      );
    } else {
      logger.info("La categoria se ha creado satisfactoriamente");
      res.json({ status: 200 });
    }
  },
};
