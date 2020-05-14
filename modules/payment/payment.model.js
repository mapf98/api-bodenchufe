module.exports = {
  getProductsToPay: (req) => {
    return req.con
      .query(
        `SELECT PPO.*, P.product_name , S.STATUS_NAME, PR.provider_name, PP.PRODUCT_PROVIDER_PRICE, 
      (P.product_long * P.product_height * P.product_width / 5000) AS VOLUMETRIC_WEIGHT,
      (SELECT OFFER_RATE FROM EC_OFFER WHERE OFFER_ID = PP.FK_OFFER_ID ) AS DISCOUNT,
      (PP.PRODUCT_PROVIDER_PRICE * PPO.PRODUCT_PROVIDER_ORDER_QUANTITY) AS TOTAL 
      FROM EC_PRODUCT_PROVIDER_ORDER PPO, EC_PRODUCT P, EC_PROVIDER PR, EC_PRODUCT_PROVIDER PP, EC_STATUS S
      WHERE PPO.fk_product_provider_id = PP.product_provider_id
      AND PP.fk_product_id = P.product_id
      AND PP.fk_provider_id = PR.provider_id
      AND PPO.fk_status_id in (SELECT status_id FROM EC_STATUS WHERE status_name in ('IN PROCESS'))
      AND PPO.fk_status_id = S.STATUS_ID
      AND PPO.fk_user_id = ${req.user_id}
      AND PPO.FK_ORDER_ID IS NULL`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getServiceCommission: (req) => {
    return req.con.query(`SELECT * FROM EC_SETTING`).catch((error) => {
      return new Error(error);
    });
  },
  getUserIdOfPayment: (con, order_id) => {
    return con
      .query(
        `SELECT FK_USER_ID FROM EC_PRODUCT_PROVIDER_ORDER
        WHERE FK_ORDER_ID = ${order_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
