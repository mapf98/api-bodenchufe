module.exports = {
  getAllUsers: (con) => {
    return con
      .query("SELECT * FROM EC_USER where \
      user_first_name='PEPE' ")
      .catch((error) => {
        return new Error(error);
      });
  },

  getShoppingCart: (con) => {
    return con
      .query(
        "select ppo.*, p.product_name ,  pr.provider_name \
        from ec_product_provider_order ppo, ec_product p, ec_provider pr, ec_product_provider pp\
        where ppo.fk_product_provider_id = pp.product_provider_id \
        and pp.fk_product_id = p.product_id \
        and pp.fk_provider_id = pr.provider_id \
        and ppo.fk_status_id in ('1','2')"
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
