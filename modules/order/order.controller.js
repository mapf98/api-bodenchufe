const createError = require("http-errors");
const orderModel = require("./order.model");
const logger = require("../../config/logLevels");

module.exports = {
  getAllOrders: async (req, res, next) => {
    var ordersResume = [];
    let products = [];
    let orders = await orderModel.getAllOrders(req.con);

    for (let index = 0; index < orders.length; index++) {
      products = await orderModel.getAllProductsOrder(
        req.con,
        orders[index].order_id
      );
      ordersResume.push({
        order: orders[index],
        products: products,
      });
    }

    if (orders instanceof Error) {
      logger.error("Error en modulo order (GET /order )");
      next(
        createError(500, `Error al obtener las ordenes  (${orders.message})`)
      );
    } else {
      logger.info(`Se entregó el detalle de las ordenes`);
      res.json({ data: ordersResume });
    }
  },
};
