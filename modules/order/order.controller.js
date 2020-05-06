const createError = require("http-errors");
const orderModel = require("./order.model");
const logger = require("../../config/logLevels");

const orderDetail = async (con, orderId) => {
  return await orderModel.productOrderDetail(con, orderId);
};

const nestOrderProducts = async (con, orders) => {
  let results = [];

  await Promise.all(
    orders.map(async (order, i) => {
      const orderDet = await orderDetail(con, order.order_id);
      let obj = new Object();
      obj = {
        order_id: orders[i].order_id,
        order_date: orders[i].order_date,
        order_amount_dollars: orders[i].order_amount_dollars,
        order_weight: orders[i].order_weight,
        order_cryptocurrency_type: orders[i].order_cryptocurrency_type,
        order_amount_cryptocurrency: orders[i].order_amount_cryptocurrency,
        fk_delivery_address_id: orders[i].fk_delivery_address_id,
        status: orders[i].status_name,
        fk_coupon_id: orders[i].fk_coupon_id,
        orderDetailProducts: orderDet,
      };
      results.push(obj);
    })
  );
  return results;
};

module.exports = {
  getUserOrders: async (req, res, next) => {
    let orders = await orderModel.getAllUserOrders(req);

    if (orders instanceof Error) {
      logger.error("Error en modulo order (GET /)");
      return next(
        createError(
          500,
          `Error al obtener las ordenes del usuario (${orders.message})`
        )
      );
    }

    orders = await nestOrderProducts(req.con, orders);

    logger.info("Lista de ordenes entregada al usuario");
    res.json({
      results: orders.length,
      orders,
    });
  },
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
