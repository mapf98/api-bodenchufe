module.exports = {
  getAllUsers: (con) => {
    return con.query("SELECT * FROM EC_USER").catch((error) => {
      return new Error(error);
    });
  },
  getShoppingCart: (con) => {
    return con
      .query(
        `SELECT PPO.*, P.product_name ,  PR.provider_name, PP.PRODUCT_PROVIDER_PRICE, 
        (PP.PRODUCT_PROVIDER_PRICE * PPO.PRODUCT_PROVIDER_ORDER_QUANTITY) AS TOTAL 
        FROM EC_PRODUCT_PROVIDER_ORDER PPO, EC_PRODUCT P, EC_PROVIDER PR, EC_PRODUCT_PROVIDER PP
        WHERE PPO.fk_product_provider_id = PP.product_provider_id
        AND PP.fk_product_id = P.product_id
        AND PP.fk_provider_id = PR.provider_id
        AND PPO.fk_status_id in ('1','2')`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  checkProductAvailability: (con, product) => {
    return con
      .query(
        `SELECT PRODUCT_PROVIDER_AVAILABLE_QUANTITY FROM EC_PRODUCT_PROVIDER 
        WHERE PRODUCT_PROVIDER_ID = ${product}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  insertProductShoppingCart: (req) => {
    return req.con
      .query(
        `INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, 
        fk_user_id, fk_order_id, fk_status_id) VALUES (${req.body.product_provider_order_quantity}, 
        ${req.body.fk_product_provider_id}, ${req.user_id}, null, 1) RETURNING
        product_provider_order_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
