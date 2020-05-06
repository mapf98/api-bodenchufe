module.exports = {
  getAllUserOrders: (req) => {
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
};
