module.exports = {
  getCoupons: (con) => {
    return con.query("SELECT * FROM EC_COUPON").catch((error) => {
      return new Error(error);
    });
  },

  updateCoupon: (con, body) => {
    return con.query(
      "UPDATE EC_COUPON SET coupon_name = $2, coupon_discount_rate = $3 WHERE coupon_id = $1",
      [body.coupon_id, body.coupon_name, body.coupon_discount_rate]
    );
  },
};
