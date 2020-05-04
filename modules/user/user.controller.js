const createError = require("http-errors");
const userModel = require("./user.model");
const logger = require("../../config/logLevels");
const auth = require("../../middlewares/auth");

module.exports = {
  getAllUsers: async (req, res, next) => {
    let users = await userModel.getAllUsers(req.con);
    if (users instanceof Error) {
      logger.error("Error en modulo user (GET /all)");
      return next(
        createError(
          500,
          `Error al obtener todos los usuarios (${users.message})`
        )
      );
    }
    logger.info("Lista general de usuarios entregada");
    res.json({
      results: users.length,
      data: { users },
    });
  },
  getShoppingCart: async (req, res, next) => {
    let shoppingCart = await userModel.getShoppingCart(req.con);
    if (shoppingCart instanceof Error) {
      logger.error("Error en modulo user (GET /shoppingCart)");
      return next(
        createError(
          500,
          `Error al obtener el carrito (${shoppingCart.message})`
        )
      );
    }
    logger.info("Lista de los productos del carrito de compras entregada");
    res.json({
      results: shoppingCart.length,
      data: { shoppingCart },
    });
  },
  checkProductAvailability: async (req, res, next) => {
    const product_id = req.body.fk_product_provider_id;
    let quantity = await userModel.checkProductAvailability(
      req.con,
      product_id
    );
    quantity = quantity[0].product_provider_available_quantity;
    if (quantity < req.body.product_provider_order_quantity)
      return next(
        createError(
          400,
          "La cantidad de productos a agregar excede a la cantidad de productos disponibles"
        )
      );
    next();
  },
  addNewProduct: async (req, res, next) => {
    let product = await userModel.insertProductShoppingCart(req);
    if (product instanceof Error) {
      logger.error("Error en modulo user (POST /shoppingCart)");
      return next(
        createError(
          500,
          `Error al insertar producto al carrito (${product.message})`
        )
      );
    }
    logger.info("Producto agregado al carrito del usuario");
    res.json({
      data: { product },
    });
  },
  deleteShoppingCartProduct: async (req, res, next) => {
    let result = await userModel.deleteShoppingCartProduct(
      req.con,
      req.params.shoppingCartId
    );
    if (result instanceof Error) {
      logger.error(
        "Error en modulo user (DELETE /shoppingCart/:shoppingCartId)"
      );
      return next(
        createError(
          500,
          `Error al eliminar producto del carrito (${product.message})`
        )
      );
    }
    logger.info("Producto eliminado del carrito del usuario");
    res.status(204).json({
      data: null,
    });
  },
};
