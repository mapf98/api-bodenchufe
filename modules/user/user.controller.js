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
    let shoppingCart = await userModel.getShoppingCart(req);
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
    let product_id;
    let type;
    if (req.params.shoppingCartId) {
      product_id = req.params.shoppingCartId;
      type = "update";
    } else if (req.body.fk_product_provider_id) {
      product_id = req.body.fk_product_provider_id;
      type = "insert";
    }
    console.log(product_id, type);
    let quantity = await userModel.checkProductAvailability(
      req.con,
      product_id,
      type
    );
    quantity = quantity[0].product_provider_available_quantity;
    if (quantity < req.body.product_provider_order_quantity)
      return next(
        createError(
          400,
          `La cantidad de productos a agregar(${req.body.product_provider_order_quantity}) excede a la cantidad de productos disponibles(${quantity})`
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
    } else {
      logger.info("Producto agregado al carrito del usuario");
      res.json({
        data: { product },
      });
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
  updateProductQuantity: async (req, res, next) => {
    const idCart = req.params.shoppingCartId;
    const quantity = req.body.product_provider_order_quantity;
    let product = await userModel.updateShoppingCartProductQuantity(
      req.con,
      quantity,
      idCart
    );
    if (product instanceof Error) {
      logger.error(
        "Error en modulo user (PATCH /shoppingCart/:shoppingCartId/quantity)"
      );
      next(
        createError(
          500,
          `Error al modificar la cantidad del producto del carrito (${product.message})`
        )
      );
    } else {
      logger.info("Cantidad del producto modificada en el carrito del usuario");
      res.json({
        status: "success",
      });
    }
  },
  addDeliveryAddress: async (req, res, next) => {
    const Lob = require("lob")(process.env.LOB_KEY);
    let respuesta;
    await Lob.usVerifications.verify(
      {
        primary_line: req.body.delivery_address_primary_line,
        city: req.body.delivery_address_city,
        state: req.body.delivery_address_state,
        zip_code: req.body.delivery_address_zip_code,
      },
      (err, response) => {
        respuesta = response;
        console.log(respuesta);
        console.log(err);
      }
    );

    if (respuesta.deliverability == "deliverable") {
      let result = await userModel.addDeliveryAddress(req);
      if (result instanceof Error) {
        logger.error("Error en modulo user (addDeliveryAddress)");
        next(
          createError(
            500,
            `Error al agregar direccion de entrega al usuario (${result.message})`
          )
        );
      } else {
        logger.info("Direccion agregada correctamente");
        res.json({
          verified: true,
        });
      }
    } else {
      res.json({ verified: false });
    }
  },
  updateDeliveryAddress: async (req, res, next) => {
    const Lob = require("lob")(process.env.LOB_KEY);
    let respuesta;
    await Lob.usVerifications.verify(
      {
        primary_line: req.body.delivery_address_primary_line,
        city: req.body.delivery_address_city,
        state: req.body.delivery_address_state,
        zip_code: req.body.delivery_address_zip_code,
      },
      (err, response) => {
        respuesta = response;
        console.log(respuesta);
        console.log(err);
      }
    );
    if (respuesta.deliverability == "deliverable") {
      let result = await userModel.updateDeliveryAddress(
        req.con,
        req.body,
        req.params
      );
      if (result instanceof Error) {
        logger.error("Error en modulo user (updateDeliveryAddress)");
        next(
          createError(
            500,
            `Error al actualizar direccion de entrega al usuario (${result.message})`
          )
        );
      } else {
        logger.info("Direccion actualizada correctamente");
        res.json({
          verified: true,
        });
      }
    } else {
      res.json({ verified: false });
    }
  },
};
