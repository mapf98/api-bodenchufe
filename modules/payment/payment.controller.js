const rp = require("request-promise");
const createError = require("http-errors");
const paymentModel = require("./payment.model");
const userModel = require("../user/user.model");
const orderModel = require("../order/order.model");
const logger = require("../../config/logLevels");
const ngrok = require("ngrok");

const paymentOrderDetail = async (req) => {
  let detail = await paymentModel.getProductsToPay(req);
  let comissions = await paymentModel.getServiceCommission(req);
  let customerDetails = await userModel.getUserById(req);
  let totalQuantity = 0;
  let subtotal = 0;
  let total = 0;
  let total_volumetric_weight = 0;
  let discount_coupon_amount = 0;
  let comissions_amount = 0;

  if (detail.length === 0) return { message: "No hay productos a pagar" };

  detail.map((el, i) => {
    totalQuantity = totalQuantity + el.product_provider_order_quantity;
    total_volumetric_weight = total_volumetric_weight + el.volumetric_weight;
    el.product_provider_price =
      el.discount === null
        ? el.product_provider_price
        : el.product_provider_price *
          (1 - (el.discount.split("%")[0] * 1) / 100);
    subtotal =
      subtotal +
      (el.discount === null
        ? el.total
        : el.total * (1 - (el.discount.split("%")[0] * 1) / 100));
    el.total = el.product_provider_price * el.product_provider_order_quantity;
  });

  comissions_amount =
    subtotal * (comissions[0].setting_service_commission.split("%")[0] / 100) +
    comissions[0].setting_payment_processor.split("$")[0] * 1;

  total = subtotal + comissions_amount;

  if (req.body.coupon_rate) {
    discount_coupon_amount =
      (subtotal * req.body.coupon_rate.split("%")[0]) / 100;

    total = total - discount_coupon_amount;
  }

  let paymentDetail = new Object({
    productsDetail: detail,
    orderSummary: {
      items: totalQuantity,
      total_volumetric_weight: `${
        Math.round(total_volumetric_weight * 1000) / 1000
      } KG`,
      subtotal,
      discount_coupon: `${req.body.coupon_rate ? req.body.coupon_rate : "NO"}`,
      discount_coupon_amount,
      service_commission: comissions[0].setting_service_commission,
      payment_processor_commission: comissions[0].setting_payment_processor,
      comissions_amount,
      total,
    },
    customerDetails: customerDetails[0],
  });
  return paymentDetail;
};

const paymentGatewayInfo = async (req) => {
  let line_items = [];
  await ngrok.disconnect();
  await ngrok.kill();
  let callback_url =
    (await ngrok.connect(process.env.PORT)) +
    "/bodenchufe/api/payment/paymentWebHook";

  req.orderDetail.productsDetail.map((el) => {
    const product = {
      sku: `${el.fk_product_provider_id}`,
      name: el.product_name,
      price: `${el.product_provider_price}`,
      currency: "USD",
      quantity: el.product_provider_order_quantity,
    };
    line_items.push(product);
  });

  let info = {
    type: "orders",
    attributes: {
      order: {
        reference: `order-${req.orderId}`,
        amount: {
          total: `${req.orderDetail.orderSummary.total}`,
          currency: "USD",
          details: {
            subtotal: `${req.orderDetail.orderSummary.subtotal}`,
            discount: `${req.orderDetail.orderSummary.discount_coupon_amount}`,
            tax: `${req.orderDetail.orderSummary.comissions_amount}`,
          },
        },
        return_urls: {
          return_url: "http://example.com/return",
          cancel_url: "http://example.com/cancel",
          callback_url,
        },
        line_items,
      },
      customer: {
        first_name: req.orderDetail.customerDetails.user_first_name,
        last_name: req.orderDetail.customerDetails.user_first_lastname,
        email: req.orderDetail.customerDetails.user_email,
      },
    },
  };
  return info;
};

const updateOrderStatus = async (req, order_id, status) => {
  let orderProducts = await orderModel.updateStatusOrderProducts(
    req,
    order_id,
    status
  );
  if (orderProducts instanceof Error) {
    logger.error(
      "Error en módulo payment (POST /paymentWebHook - updateStatusOrderProducts())"
    );
  }
  let order = await orderModel.updateStatusUserOrder(req.con, order_id, status);
  if (order instanceof Error) {
    logger.error(
      "Error en módulo payment (POST /paymentWebHook - updateStatusUserOrder())"
    );
  }
  if (status === "PAID")
    logger.info(`Pago recibido de la orden N.[${order_id}]`);
  else if (status === "REJECTED")
    logger.info(`Pago rechazado de la orden N.[${order_id}]`);
};

module.exports = {
  paymentDetail: async (req, res, next) => {
    let detail = await paymentOrderDetail(req);
    res.json(detail);
  },
  createOrder: async (req, res, next) => {
    req.orderDetail = await paymentOrderDetail(req);
    if (req.orderDetail.message)
      return next(
        createError(
          500,
          `Error al realizar el pago.(${req.orderDetail.message})`
        )
      );

    let order = await orderModel.createUserOrder(req);
    console.log(order);
    if (order instanceof Error) {
      logger.error("Error en módulo payment (POST /payOrder - createOrder())");
      res.json({ obtained: false });
      return next(
        createError(500, `Error al crear nueva orden (${order.message})`)
      );
    }
    let productsOfOrder = await orderModel.addOrderIdToProductProviderOrder(
      req,
      order[0].order_id
    );
    if (productsOfOrder instanceof Error) {
      logger.error("Error en módulo payment (POST /payOrder - createOrder())");
      res.json({ obtained: false });
      return next(
        createError(
          500,
          `Error al agregar el id de la orden a los productos.  (${productsOfOrder.message})`
        )
      );
    }
    req.orderId = order[0].order_id;
    next();
  },
  payOrder: async (req, res, next) => {
    let paymentInfo = await paymentGatewayInfo(req);
    //console.log(paymentInfo.attributes.order.return_urls.callback_url);

    const headers = {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.UTRUST_API_KEY}`,
      Connection: "keep-alive",
    };

    let paymentUrl = await rp({
      method: "post",
      url: "https://merchants.api.sandbox-utrust.com/api/stores/orders",
      headers,
      json: true,
      body: {
        data: paymentInfo,
      },
    }).catch((error) => {
      console.log(error);
    });

    res.status(200).json({
      paymentUrl,
    });
  },
  paymentWebHook: async (req, res, next) => {
    let order_id = req.body.resource.reference.split("-")[1];
    let user_id = await paymentModel.getUserIdOfPayment(req.con, 14);
    req.user_id = user_id[0].fk_user_id;

    if (req.body.event_type === "ORDER.PAYMENT.RECEIVED") {
      updateOrderStatus(req, order_id, "PAID");
    } else if (req.body.event_type === "ORDER.PAYMENT.CANCELLED") {
      updateOrderStatus(req, order_id, "REJECTED");
    }
    await ngrok.disconnect();
    await ngrok.kill();
    res.json({ success: true });
  },
};
