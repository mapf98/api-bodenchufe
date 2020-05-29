const createError = require("http-errors");
const orderModel = require("./order.model");
const couponModel = require("../coupon/coupon.model");
const productModel = require("../product/product.model");
const logger = require("../../config/logLevels");

// Esta función obtiene todos los productos asociados a una orden.
const orderDetail = async (con, orderId) => {
  let result = [];
  const products = await orderModel.productOrderDetail(con, orderId);

  await Promise.all(
    products.map(async (product) => {
      const discount = await productModel.getDiscountOfProduct(
        con,
        product.product_provider_id
      );
      let obj = {
        product_name: product.product_name,
        product_photo: product.product_photo,
        provider_name: product.provider_name,
        product_provider_price: product.product_provider_price,
        product_provider_order_quantity:
          product.product_provider_order_quantity,
        product_provider_id: product.product_provider_id,
        discount: discount.length > 0 ? discount[0].offer_rate : null,
      };
      result.push(obj);
    })
  );
  return result;
};

// Esta función permite anidar cada orden del usuario con los productos incluidos en la orden
const nestOrderProducts = async (con, orders) => {
  let results = [];

  await Promise.all(
    orders.map(async (order, i) => {
      let couponRate = null;
      if (order.fk_coupon_id != null) {
        couponRate = await couponModel.getCouponById(con, order.fk_coupon_id);
        couponRate = couponRate[0].coupon_discount_rate;
      }
      const orderDet = await orderDetail(con, order.order_id);
      let obj = new Object();
      obj = {
        order_id: order.order_id,
        order_date: order.order_date,
        order_amount_dollars: order.order_amount_dollars,
        order_weight: order.order_weight,
        fk_delivery_address_id: order.fk_delivery_address_id,
        status: order.status_name,
        fk_coupon_id: order.fk_coupon_id,
        coupon_rate: couponRate,
        orderDetailProducts: orderDet,
      };
      results.push(obj);
    })
  );
  return results;
};

module.exports = {
  getUserOrders: async (req, res, next) => {
    let orders = await orderModel.getOrdersOfUser(req);

    if (orders instanceof Error) {
      logger.error(
        "Error en módulo order (GET /user/orders - getUserOrders())"
      );
      res.json({ obtained: false });
      return next(
        createError(
          500,
          `Error al obtener las ordenes de un usuario [USER_ID: ${req.user_id}] (${orders.message})`
        )
      );
    }

    orders = await nestOrderProducts(req.con, orders);

    logger.info(
      `Lista de ordenes entregada al usuario satisfactoriamente [USER_ID: ${req.user_id}]`
    );
    res.json({
      results: orders.length,
      orders: orders,
      obtained: true,
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
      logger.error("Error en módulo order (GET /order - getAllOrders())");
      next(
        createError(500, `Error al obtener las órdenes (${orders.message})`)
      );
    } else {
      logger.info(
        `Se entregó el listado de órdenes (con su detalle correspondiente) satisfactoriamente`
      );
      res.json({ orders: ordersResume });
    }
  },
};
