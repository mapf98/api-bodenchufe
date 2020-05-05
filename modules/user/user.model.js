module.exports = {
  getAllUsers: (con) => {
    return con.query("SELECT * FROM EC_USER").catch((error) => {
      return new Error(error);
    });
  },
  getShoppingCart: (req) => {
    return req.con
      .query(
        `SELECT PPO.*, P.product_name ,  PR.provider_name, PP.PRODUCT_PROVIDER_PRICE, 
        (SELECT OFFER_RATE FROM EC_OFFER WHERE OFFER_ID = PP.FK_OFFER_ID ) AS DISCOUNT,
        (PP.PRODUCT_PROVIDER_PRICE * PPO.PRODUCT_PROVIDER_ORDER_QUANTITY) AS TOTAL, S.STATUS_NAME 
        FROM EC_PRODUCT_PROVIDER_ORDER PPO, EC_PRODUCT P, EC_PROVIDER PR, EC_PRODUCT_PROVIDER PP, EC_STATUS S
        WHERE PPO.fk_product_provider_id = PP.product_provider_id
        AND PP.fk_product_id = P.product_id
        AND PP.fk_provider_id = PR.provider_id
        AND PPO.fk_status_id in (SELECT status_id FROM EC_STATUS WHERE status_name in ('selected','unselected'))
        AND PPO.fk_status_id = S.STATUS_ID
        AND PPO.fk_user_id = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  checkProductAvailability: (con, product, type) => {
    if (type === "insert") {
      return con
        .query(
          `SELECT PRODUCT_PROVIDER_AVAILABLE_QUANTITY FROM EC_PRODUCT_PROVIDER 
          WHERE PRODUCT_PROVIDER_ID = ${product}`
        )
        .catch((error) => {
          return new Error(error);
        });
    } else {
      return con
        .query(
          `SELECT PRODUCT_PROVIDER_AVAILABLE_QUANTITY FROM EC_PRODUCT_PROVIDER, EC_PRODUCT_PROVIDER_ORDER
        WHERE PRODUCT_PROVIDER_ORDER_ID = ${product} 
        AND fk_product_provider_id = product_provider_id`
        )
        .catch((error) => {
          return new Error(error);
        });
    }
  },
  insertProductShoppingCart: (req) => {
    return req.con
      .query(
        `INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, 
        fk_user_id, fk_order_id, fk_status_id) VALUES (${req.body.product_provider_order_quantity}, 
        ${req.body.fk_product_provider_id}, ${req.user_id}, null, (SELECT status_id FROM EC_STATUS 
        WHERE status_name = 'selected')) RETURNING product_provider_order_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  deleteShoppingCartProduct: (con, idCart) => {
    return con
      .query(
        `DELETE FROM EC_PRODUCT_PROVIDER_ORDER WHERE PRODUCT_PROVIDER_ORDER_ID = ${idCart} 
      AND FK_STATUS_ID IN (SELECT status_id FROM EC_STATUS WHERE status_name in ('selected','unselected'))`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateShoppingCartProductQuantity: (con, cantidad, cartId) => {
    return con
      .query(
        `UPDATE EC_PRODUCT_PROVIDER_ORDER SET product_provider_order_quantity = ${cantidad}
         WHERE PRODUCT_PROVIDER_ORDER_ID = ${cartId} AND FK_STATUS_ID IN 
         (SELECT status_id FROM EC_STATUS WHERE status_name in ('selected','unselected'))`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
