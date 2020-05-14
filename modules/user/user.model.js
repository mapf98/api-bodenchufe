module.exports = {
  getAllUsers: (con) => {
    return con
      .query(
        `SELECT U.*, R.ROL_NAME,S.STATUS_NAME FROM EC_USER U, EC_STATUS S, EC_ROL R 
        WHERE U.FK_STATUS_ID = S.STATUS_ID AND U.FK_ROL_ID = R.ROL_ID `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getUserById: (req) => {
    return req.con
      .query(
        `SELECT USER_FIRST_NAME, USER_FIRST_LASTNAME, USER_EMAIL FROM EC_USER WHERE USER_ID = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateUserPersonalInfo: (req) => {
    return req.con
      .result(
        `UPDATE EC_USER SET 
        user_first_name = '${req.body.user_first_name}', 
        user_first_lastname = '${req.body.user_first_lastname}',
        user_second_name = '${req.body.user_second_name}', 
        user_second_lastname = '${req.body.user_second_lastname}',
        user_birthdate = '${req.body.user_birthdate}', 
        fk_language_id = (SELECT LANGUAGE_ID FROM EC_LANGUAGE WHERE LANGUAGE_NAME = '${req.body.language}')
        WHERE USER_ID = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  setUserPhoto: (req) => {
    return req.con
      .result(
        `UPDATE EC_USER SET user_photo = ${req.body.user_photo},
        WHERE USER_ID = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getCurrentPassword: (req) => {
    return req.con
      .result(
        `SELECT USER_PASSWORD FROM EC_USER WHERE USER_ID = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updatePassword: (req) => {
    return req.con
      .result(
        `UPDATE EC_USER SET user_password = ${req.body.new_password} 
       WHERE USER_ID = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateStatusAccount: (req) => {
    return req.con
      .result(
        `UPDATE EC_USER SET FK_STATUS_ID = (SELECT S.STATUS_ID FROM EC_STATUS S
      WHERE S.STATUS_NAME = 'INACTIVE') WHERE USER_ID = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  activateAccount: (req) => {
    return req.con
      .result(
        `UPDATE EC_USER SET FK_STATUS_ID = (SELECT S.STATUS_ID FROM EC_STATUS S
    WHERE S.STATUS_NAME = 'ACTIVE') WHERE USER_ID = ${req.params.userId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  blockAccount: (req) => {
    return req.con
      .result(
        `UPDATE EC_USER SET FK_STATUS_ID = (SELECT S.STATUS_ID FROM EC_STATUS S
    WHERE S.STATUS_NAME = 'INACTIVE') WHERE USER_ID = ${req.params.userId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getShoppingCart: (req) => {
    return req.con
      .query(
        `SELECT PPO.*, P.product_name , S.STATUS_NAME, PR.provider_name, PP.PRODUCT_PROVIDER_PRICE, 
        (P.product_long * P.product_height * P.product_width / 5000) AS VOLUMETRIC_WEIGHT,
        (SELECT OFFER_RATE FROM EC_OFFER WHERE OFFER_ID = PP.FK_OFFER_ID ) AS DISCOUNT,
        (PP.PRODUCT_PROVIDER_PRICE * PPO.PRODUCT_PROVIDER_ORDER_QUANTITY) AS TOTAL, S.STATUS_NAME 
        FROM EC_PRODUCT_PROVIDER_ORDER PPO, EC_PRODUCT P, EC_PROVIDER PR, EC_PRODUCT_PROVIDER PP, EC_STATUS S
        WHERE PPO.fk_product_provider_id = PP.product_provider_id
        AND PP.fk_product_id = P.product_id
        AND PP.fk_provider_id = PR.provider_id
        AND PPO.fk_status_id in (SELECT status_id FROM EC_STATUS WHERE status_name in ('SELECTED','UNSELECTED','IN PROCESS'))
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
        WHERE status_name = 'SELECTED')) RETURNING product_provider_order_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  deleteShoppingCartProduct: (con, idCart) => {
    return con
      .result(
        `DELETE FROM EC_PRODUCT_PROVIDER_ORDER WHERE PRODUCT_PROVIDER_ORDER_ID = ${idCart} 
      AND FK_STATUS_ID IN (SELECT status_id FROM EC_STATUS WHERE status_name in ('SELECTED','UNSELECTED'))`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateShoppingCartProductQuantity: (con, quantity, cartId) => {
    return con
      .query(
        `UPDATE EC_PRODUCT_PROVIDER_ORDER SET product_provider_order_quantity = ${quantity}
         WHERE PRODUCT_PROVIDER_ORDER_ID = ${cartId} AND FK_STATUS_ID IN 
         (SELECT status_id FROM EC_STATUS WHERE status_name in ('SELECTED','UNSELECTED'))`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  addDeliveryAddress: (req) => {
    return req.con
      .query(
        `INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, 
        delivery_address_city, delivery_address_state, delivery_address_zip_code, 
        delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, 
        fk_user_id, fk_status_id)
        VALUES ('${req.body.delivery_address_primary_line}', '${req.body.delivery_address_secondary_line}', 
        '${req.body.delivery_address_city}', '${req.body.delivery_address_state}', 
        ${req.body.delivery_address_zip_code}, '${req.body.delivery_address_aditional_info}',
        '${req.body.delivery_address_security_code}', '${req.body.delivery_address_locker_code}', 
        ${req.user_id}, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE')) 
        RETURNING delivery_address_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateDeliveryAddress: (con, body, params) => {
    return con
      .result(
        `UPDATE EC_DELIVERY_ADDRESS 
         SET delivery_address_primary_line = '${body.delivery_address_primary_line}', 
         delivery_address_secondary_line = '${body.delivery_address_secondary_line}', 
         delivery_address_city = '${body.delivery_address_city}', 
         delivery_address_state ='${body.delivery_address_state}', 
         delivery_address_zip_code = ${body.delivery_address_zip_code}, 
         delivery_address_aditional_info = '${body.delivery_address_aditional_info}', 
         delivery_address_security_code = ${body.delivery_address_security_code}, 
         delivery_address_locker_code = ${body.delivery_address_locker_code}
         WHERE delivery_address_id = ${params.deliveryAddressId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getUserCoupons: (req) => {
    return req.con
      .query(`SELECT * FROM EC_COUPON WHERE fk_user_id = ${req.user_id}`)
      .catch((error) => {
        return new Error(error);
      });
  },
  getUserCouponsForOrders: (con, user_id, orderPrice) => {
    return con
      .query(
        `SELECT COU.coupon_name,
                COU.coupon_discount_rate,
                COU.coupon_min_use,
                COU.coupon_max_use
          FROM EC_COUPON AS COU,
                EC_USER AS USR
          WHERE COU.fk_user_id = USR.user_id
                AND COU.fk_status_id = (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE')
                  AND COU.fk_user_id = ${user_id}
                  AND COU.coupon_min_use < ${orderPrice}
                  AND COU.coupon_max_use > ${orderPrice}
      `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateProviderStock: (con, productId, quantity) => {
    return con
      .query(
        `UPDATE EC_PRODUCT_PROVIDER SET product_provider_available_quantity = 
        ((SELECT P.product_provider_available_quantity FROM EC_PRODUCT_PROVIDER P 
        WHERE P.product_provider_id = ${productId} )-${quantity}) WHERE product_provider_id = ${productId} `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
