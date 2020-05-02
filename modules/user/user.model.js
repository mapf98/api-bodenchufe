module.exports = {
  getAllUsers: (con) => {
    return con.query("SELECT * FROM EC_USER").catch((error) => {
      return new Error(error);
    });
  },

  getShoppingCart: (con) => {
    return con
      .query(
        "SELECT PPO.*, P.product_name ,  PR.provider_name \
        FROM EC_PRODUCT_PROVIDER_ORDER PPO, EC_PRODUCT P, EC_PROVIDER PR, EC_PRODUCT_PROVIDER PP\
        WHERE PPO.fk_product_provider_id = PP.product_provider_id \
        AND PP.fk_product_id = P.product_id \
        AND PP.fk_provider_id = PR.provider_id \
        AND PPO.fk_status_id in ('1','2')"
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
