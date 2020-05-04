module.exports = {
  getCoupons: (con) => {
    return con.query("SELECT * FROM EC_COUPON").catch((error) => {
      return new Error(error);
    });
  },

  addCoupon: (con, body) => {
    return con
      .query(
        `INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, fk_status_id, fk_user_id) 
                      VALUES ('${body.coupon_name}', '${body.coupon_discount_rate}', 3 , ${body.fk_user_id})`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
