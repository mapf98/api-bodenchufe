const createError = require("http-errors");
const userModel = require("./user.model");
const logger = require("../../config/logLevels");
const auth = require("../../middlewares/auth");

module.exports = {
  getAllUsers: async (req, res, next) => {
    let users = await userModel.getAllUsers(req.con);
    if (users instanceof Error) {
      logger.error("Error en modulo user (GET /all)");
      next(
        createError(
          500,
          `Error al obtener todos los usuarios (${users.message})`
        )
      );
    } else {
      logger.info("Lista general de usuarios entregada");
      res.json({
        results: users.length,
        data: { users },
      });
    }
  },
  getShoppingCart: async (req, res, next) => {
    let shoppingCart = await userModel.getShoppingCart(req.con);
    if (shoppingCart instanceof Error) {
      logger.error("Error en modulo user (GET /shoppingCart)");
      next(
        createError(
          500,
          `Error al obtener el carrito (${shoppingCart.message})`
        )
      );
    } else {
      logger.info("Lista de los productos del carrito de compras entregada");
      res.json({
        results: shoppingCart.length,
        data: { shoppingCart },
      });
    }
  },
};
