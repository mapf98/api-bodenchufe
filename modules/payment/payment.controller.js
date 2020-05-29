const rp = require("request-promise");
const createError = require("http-errors");
const paymentModel = require("./payment.model");
const userModel = require("../user/user.model");
const orderModel = require("../order/order.model");
const couponModel = require("../coupon/coupon.model");
const logger = require("../../config/logLevels");
const ngrok = require("ngrok");
const Email = require("../../utils/Email");

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

  // Por cada producto a pagar se calculan los totales, peso, descuentos, dependiendo de la cantidad.
  detail.map((el, i) => {
    totalQuantity = totalQuantity + el.product_provider_order_quantity;
    total_volumetric_weight =
      total_volumetric_weight +
      el.volumetric_weight * el.product_provider_order_quantity;
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
    el.total =
      Math.round(
        el.product_provider_price * el.product_provider_order_quantity * 100
      ) / 100;
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
      subtotal: Math.round(subtotal * 100) / 100,
      discount_coupon: `${req.body.coupon_rate ? req.body.coupon_rate : "NO"}`,
      discount_coupon_amount,
      service_commission: comissions[0].setting_service_commission,
      payment_processor_commission: comissions[0].setting_payment_processor,
      comissions_amount: Math.round(comissions_amount * 100) / 100,
      total: Math.round(total * 100) / 100,
    },
    customerDetails: customerDetails[0],
  });
  return paymentDetail;
};

// En esta función se crea el json con la informacion del pago que sera enviado a la pasarela de pagos
const paymentGatewayInfo = async (req) => {
  let port = req.body.port;
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
      price: `${Math.round(el.product_provider_price * 100) / 100}`,
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
          return_url: `http://localhost:${port}/success`,
          cancel_url: `http://localhost:${port}/home`,
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

// Este método se ejecuta despues de que la compra haya sido confirmada, actualiza el status a
// pagado o rechazado dependiendo de la confirmación del pago
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

// Este método se ejecuta en caso de que el pago haya sido rechazado, de ser cierto se reintegra el inventario al proveedor
const reinstateInventory = async (con, order_id) => {
  let productsQuantity = await paymentModel.getProductQuantityOfOrder(
    con,
    order_id
  );

  Promise.all(
    productsQuantity.map(async (el) => {
      await paymentModel.reinstateInventory(
        con,
        el.fk_product_provider_id,
        el.quantity
      );
    })
  );
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
    await couponModel.disableCoupon(req.con, req.body);
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
  // Este webhook permite recibir una petición desde la pasarela de pagos para saber si el pago ha
  // sido confirmado o rechazado.
  paymentWebHook: async (req, res, next) => {
    let order_id = req.body.resource.reference.split("-")[1];
    let user_id = await paymentModel.getUserIdOfPayment(req.con, order_id);
    req.user_id = user_id[0].fk_user_id;
    let user_info = await userModel.getUserById(req);
    let orderDetail = await orderModel.productOrderDetail(req.con, order_id);
    let amount = req.body.resource.amount;

    if (req.body.event_type === "ORDER.PAYMENT.RECEIVED") {
      updateOrderStatus(req, order_id, "PAID");
      new Email(user_info[0]).sendPaymentConfirmation({
        orderDetail,
        amount,
        order_id,
      });
    } else if (req.body.event_type === "ORDER.PAYMENT.CANCELLED") {
      updateOrderStatus(req, order_id, "REJECTED");
      reinstateInventory(req.con, order_id);
    }
    await ngrok.disconnect();
    await ngrok.kill();
    res.json({ success: true });
  },
};
