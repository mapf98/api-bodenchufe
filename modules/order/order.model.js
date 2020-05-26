module.exports = {
  getOrdersOfUser: (req) => {
    return req.con
      .query(
        `SELECT DISTINCT O.*, S.STATUS_NAME FROM EC_ORDER O, 
        EC_PRODUCT_PROVIDER_ORDER PPO, EC_STATUS S, EC_COUPON C
        WHERE PPO.FK_USER_ID = ${req.user_id} 
        AND PPO.FK_ORDER_ID = O.ORDER_ID
        AND O.FK_STATUS_ID = S.STATUS_ID
        ORDER BY O.ORDER_ID`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getOrderById: (req, order_id) => {
    return req.con
      .query(
        `SELECT DISTINCT O.*, S.STATUS_NAME FROM EC_ORDER O, EC_PRODUCT_PROVIDER_ORDER PPO, EC_STATUS S
        WHERE O.ORDER_ID = ${order_id} 
        AND PPO.FK_ORDER_ID = O.ORDER_ID
        AND O.FK_STATUS_ID = S.STATUS_ID`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  productOrderDetail: (con, order_id) => {
    return con
      .query(
        `SELECT P.*, PR.PROVIDER_NAME, PP.PRODUCT_PROVIDER_PRICE ,PPO.PRODUCT_PROVIDER_ORDER_QUANTITY,
        PP.PRODUCT_PROVIDER_ID
        FROM EC_PRODUCT P, EC_PRODUCT_PROVIDER PP, 
        EC_PRODUCT_PROVIDER_ORDER PPO, EC_PROVIDER PR
        WHERE P.PRODUCT_ID = PP.FK_PRODUCT_ID
        AND PP.PRODUCT_PROVIDER_ID = PPO.FK_PRODUCT_PROVIDER_ID
        AND PR.PROVIDER_ID = PP.FK_PROVIDER_ID
        AND PPO.FK_ORDER_ID = ${order_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getAllOrders: (con) => {
    return con
      .query(
        `SELECT ORD.order_id,
                  ORD.order_date,
                  ORD.order_weight,
                  ORD.order_amount_dollars,
                  STA.status_name,
                  DAS.delivery_address_primary_line,
                  (SELECT COUAUX.coupon_discount_rate
                    FROM EC_COUPON AS COUAUX,
                          EC_ORDER AS ORDAUX
                    WHERE COUAUX.coupon_id = ORDAUX.fk_coupon_id
                            AND ORDAUX.order_id = ORD.order_id) AS coupon_applied,
                  (SELECT DISTINCT USR.user_email
                    FROM EC_USER AS USR,
                          EC_PRODUCT_PROVIDER_ORDER AS PPO,
                          EC_ORDER AS ORDAUX
                    WHERE USR.user_id = PPO.fk_user_id
                            AND ORDAUX.order_id = PPO.fk_order_id
                            AND ORDAUX.order_id = ORD.order_id) AS user_email
          FROM EC_ORDER AS ORD,
              EC_DELIVERY_ADDRESS AS DAS,
              EC_STATUS AS STA
          WHERE ORD.fk_delivery_address_id = DAS.delivery_address_id
              AND ORD.fk_status_id = STA.status_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getAllProductsOrder: (con, orderId) => {
    return con
      .query(
        `SELECT PPO.product_provider_order_quantity AS product_quantity,
                PPV.product_provider_price AS product_price,
                PRV.provider_name,
                PRO.product_name,
                PRO.product_photo
          FROM EC_PRODUCT_PROVIDER_ORDER AS PPO,
                EC_ORDER AS ORD,
                EC_PRODUCT_PROVIDER AS PPV,
                EC_PROVIDER AS PRV,
                EC_PRODUCT AS PRO
          WHERE PPO.fk_order_id = ORD.order_id
                AND PPO.fk_product_provider_id = PPV.product_provider_id
                AND PPV.fk_provider_id = PRV.provider_id
                AND PPV.fk_product_id = PRO.product_id
                AND ORD.order_id = ${orderId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  createUserOrder: async (req) => {
    let f = new Date();
    let year = f.getFullYear();
    let month = f.getMonth();
    let day = f.getDate();
    let fecha_actual = year + "-" + month + "-" + day;

    let order_weight =
      req.orderDetail.orderSummary.total_volumetric_weight.split(" ")[0] * 1;
    return req.con
      .query(
        `INSERT INTO EC_ORDER (order_date, order_amount_dollars, order_weight,
         fk_delivery_address_id, fk_status_id, fk_coupon_id) 
         VALUES ('2019-10-10' , ${req.orderDetail.orderSummary.total}, 
          ${order_weight}, ${req.body.delivery_address_id},
          (SELECT STATUS_ID FROM EC_STATUS WHERE STATUS_NAME= 'IN PROCESS'), 
          ${req.body.coupon_id ? req.body.coupon_id : null}) RETURNING ORDER_ID`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  addOrderIdToProductProviderOrder: async (req, order_id) => {
    return req.con
      .query(
        `UPDATE EC_PRODUCT_PROVIDER_ORDER SET FK_ORDER_ID = ${order_id}
        WHERE FK_STATUS_ID = (SELECT STATUS_ID FROM EC_STATUS WHERE STATUS_NAME = 'IN PROCESS')
        AND FK_ORDER_ID IS NULL`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateStatusOrderProducts: async (req, order_id, status) => {
    return req.con
      .query(
        `UPDATE EC_PRODUCT_PROVIDER_ORDER SET FK_STATUS_ID = 
      (SELECT STATUS_ID FROM EC_STATUS WHERE STATUS_NAME = '${status}') 
      WHERE FK_ORDER_ID ${order_id === null ? "IS" : "="} ${order_id}
      AND FK_USER_ID = ${req.user_id}
      AND FK_STATUS_ID = (SELECT STATUS_ID FROM EC_STATUS WHERE STATUS_NAME = 'SELECTED')`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateStatusUserOrder: async (con, order_id, status) => {
    return con
      .query(
        `UPDATE EC_ORDER SET FK_STATUS_ID = (SELECT STATUS_ID FROM EC_STATUS WHERE STATUS_NAME = '${status}') 
      WHERE ORDER_ID = ${order_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
