const createError = require("http-errors");
const userModel = require("./user.model");
const logger = require("../../config/logLevels");
const Lob = require("lob")(process.env.LOB_KEY);

module.exports = {
  getAllUsers: async (req, res, next) => {
    let users = await userModel.getAllUsers(req.con);
    if (users instanceof Error) {
      logger.error("Error en módulo user (GET /user/all - getAllUsers())");
      res.json({ obtained: false });
      return next(
        createError(
          500,
          `Error al obtener todos los usuarios (${users.message})`
        )
      );
    }

    logger.info("Listado de usuarios entregado satisfactoriamente");
    res.json({
      results: users.length,
      users: users,
      obtained: true,
    });
  },
  disableMyAccount: async (req, res, next) => {
    let user = await userModel.updateStatusAccount(req);
    if (user instanceof Error || user.rowCount == 0) {
      logger.error(
        "Error en módulo user (PATCH /user/disableMe - disableMyAccount())"
      );
      res.json({ disabled: false });
      return next(
        createError(
          500,
          `Error al desactivar la cuenta de un usuario [USER_ID: ${req.user_id}] (${user.message})`
        )
      );
    }

    logger.info(
      `Cuenta del usuario desactivada satisfactoriamente [USER_ID: ${req.user_id}]`
    );
    res.json({ disabled: true });
  },
  activateAccount: async (req, res, next) => {
    let user = await userModel.activateAccount(req);
    if (user instanceof Error || user.rowCount == 0) {
      logger.error(
        "Error en módulo user (PATCH /user/activateAccount/:userId - activateAccount())"
      );
      res.json({ activated: false });
      return next(
        createError(
          500,
          `Error al activar la cuenta del usuario [USER_ID: ${req.user_id}] (${user.message})`
        )
      );
    }
    logger.info(
      `Cuenta del usuario activada satisfactoriamente [USER_ID: ${req.user_id}]`
    );
    res.json({ activated: true });
  },
  blockAccount: async (req, res, next) => {
    let user = await userModel.blockAccount(req);
    if (user instanceof Error || user.rowCount == 0) {
      logger.error(
        "Error en módulo user (PATCH /user/blockAccount/:userId - blockAccount())"
      );
      res.json({ blocked: false });
      return next(
        createError(
          500,
          `Error al bloquear la cuenta del usuario [USER_ID: ${req.user_id}] (${user.message})`
        )
      );
    }
    logger.info(
      `Cuenta del usuario bloqueada satisfactoriamente [USER_ID: ${req.user_id}]`
    );
    res.json({ blocked: true });
  },
  getShoppingCart: async (req, res, next) => {
    let shoppingCart = await userModel.getShoppingCart(req);
    if (shoppingCart instanceof Error) {
      logger.error(
        "Error en módulo user (GET /user/shoppingCart - getShoppingCart())"
      );
      res.json({ obtained: false });
      return next(
        createError(
          500,
          `Error al obtener el carrito de un usuario [USER_ID: ${req.user_id}] (${shoppingCart.message})`
        )
      );
    }
    logger.info("Lista de los productos del carrito de compras entregada");
    res.json({
      results: shoppingCart.length,
      shoppingCart: shoppingCart,
      obtained: true,
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
    if (quantity < req.body.product_provider_order_quantity) {
      res.json({ checked: false });
      return next(
        createError(
          500,
          `La cantidad de productos a agregar [${req.body.product_provider_order_quantity}] excede a la cantidad de productos disponibles [${quantity}]`
        )
      );
    }
    next();
  },
  addNewProduct: async (req, res, next) => {
    let product = await userModel.insertProductShoppingCart(req);
    if (product instanceof Error) {
      logger.error(
        "Error en módulo user (POST /user/shoppingCart - addNewProduct())"
      );
      res.json({ added: false });
      return next(
        createError(
          500,
          `Error al insertar un producto al carrito [SHOPPING_CART_USER_ID: ${req.user_id}] (${product.message})`
        )
      );
    } else {
      logger.info(
        `Producto agregado al carrito del usuario satisfactoriamente [SHOPPING_CART_USER_ID: ${req.user_id}]`
      );
      res.json({
        product: product,
        added: true,
      });
    }
  },
  deleteShoppingCartProduct: async (req, res, next) => {
    let result = await userModel.deleteShoppingCartProduct(
      req.con,
      req.params.shoppingCartId
    );
    if (result instanceof Error || result.rowCount == 0) {
      logger.error(
        "Error en módulo user (DELETE /user/shoppingCart/:shoppingCartId - deleteShoppingCartProduct())"
      );
      res.json({ deleted: false });
      return next(
        createError(
          500,
          `Error al eliminar un producto del carrito de un usuario [USER_ID: ${req.product_id} | SHOPPING_CART_ID: ${req.params.shoppingCartId}] (${product.message})`
        )
      );
    }
    logger.info(
      `Producto eliminado satisfactoriamente del carrito del usuario [USER_ID: ${req.product_id} | SHOPPING_CART_ID: ${req.params.shoppingCartId}]`
    );
    res.json({ deleted: true });
  },
  updateProductQuantity: async (req, res, next) => {
    const idCart = req.params.shoppingCartId;
    const quantity = req.body.product_provider_order_quantity;
    let product = await userModel.updateShoppingCartProductQuantity(
      req.con,
      quantity,
      idCart
    );
    if (product instanceof Error || product.rowCount == 0) {
      logger.error(
        "Error en módulo user (PATCH /user/shoppingCart/:shoppingCartId/quantity - updateProductQuantity())"
      );
      res.json({ updated: false });
      next(
        createError(
          500,
          `Error al modificar la cantidad del producto del carrito [USER_ID: ${req.product_id} | SHOPPING_CART_ID: ${idCart} | QUANTITY: ${quantity}] (${product.message})`
        )
      );
    } else {
      logger.info(
        `Cantidad del producto modificada en el carrito del usuario satisfactoriamente [USER_ID: ${req.product_id} | SHOPPING_CART_ID: ${idCart} | QUANTITY: ${quantity}]`
      );
      res.json({ updated: true });
    }
  },
  addDeliveryAddress: async (req, res, next) => {
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
        logger.error(
          "Error en módulo user (POST /user/deliveryAddress/:userId - addDeliveryAddress())"
        );
        res.json({ verified: false });
        next(
          createError(
            500,
            `Error al agregar una dirección de entrega asociada a un usuario [USER_ID: ${req.user_id}] (${result.message})`
          )
        );
      } else {
        logger.info(
          `Dirección agregada satisfactoriamente [USER_ID: ${req.user_id} | DELIVERY_ADDRESS_ID: ${result[0].delivery_address_id}]`
        );
        res.json({ verified: true });
      }
    } else {
      res.json({ verified: false });
    }
  },
  updateDeliveryAddress: async (req, res, next) => {
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
      if (result instanceof Error || result.rowCount == 0) {
        logger.error(
          "Error en módulo user (PUT /user/deliveryAddress/:deliveryAddressId - updateDeliveryAddress())"
        );
        res.json({ verified: false });
        next(
          createError(
            500,
            `Error al actualizar dirección de entrega asociada a un usuario [USER_ID: ${req.user_id} | DELIVERY_ADDRESS_ID: ${req.params.deliveryAddressId}] (${result.message})`
          )
        );
      } else {
        logger.info(
          `Dirección de entrega actualizada satisfactoriamente [USER_ID: ${req.user_id} | DELIVERY_ADDRESS_ID: ${req.params.deliveryAddressId}]`
        );
        res.json({ verified: true });
      }
    } else {
      res.json({ verified: false });
    }
  },
};
