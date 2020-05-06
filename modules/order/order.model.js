module.exports = {
  getOrdersOfUser: (req) => {
    return req.con
      .query(
        `SELECT DISTINCT O.*, S.STATUS_NAME FROM EC_ORDER O, EC_PRODUCT_PROVIDER_ORDER PPO, EC_STATUS S
        WHERE PPO.FK_USER_ID = ${req.user_id} 
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
        `SELECT P.*, PPO.PRODUCT_PROVIDER_ORDER_QUANTITY 
        FROM EC_PRODUCT P, EC_PRODUCT_PROVIDER PP, 
        EC_PRODUCT_PROVIDER_ORDER PPO
        WHERE P.PRODUCT_ID = PP.FK_PRODUCT_ID
        AND PP.PRODUCT_PROVIDER_ID = PPO.FK_PRODUCT_PROVIDER_ID
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
                  ORD.order_cryptocurrency_type,
                  ORD.order_amount_cryptocurrency,
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
};
