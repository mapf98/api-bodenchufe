module.exports = {
  getCoupons: (con) => {
    return con.query("SELECT * FROM EC_COUPON").catch((error) => {
      return new Error(error);
    });
  },
  getCouponById: (con, id) => {
    return con
      .query(`SELECT * FROM EC_COUPON WHERE COUPON_ID = ${id}`)
      .catch((error) => {
        return new Error(error);
      });
  },
  addCoupon: (con, body) => {
    return con
      .query(
        `INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_status_id, fk_user_id) 
         VALUES ('${body.coupon_name}', '${body.coupon_discount_rate}', ${body.coupon_min_use}, ${body.coupon_max_use}, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE') , ${body.fk_user_id})`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateCoupon: (con, body) => {
    return con.result(
      `UPDATE EC_COUPON SET coupon_name = '${body.coupon_name}', coupon_discount_rate = '${body.coupon_discount_rate}', coupon_min_use = ${body.coupon_min_use}, coupon_max_use = ${body.coupon_max_use} WHERE coupon_id = ${body.coupon_id}`
    );
  },
  disableCoupon: (con, body) => {
    return con
      .result(
        `UPDATE EC_COUPON 
          SET fk_status_id = (SELECT status_id 
                              FROM EC_STATUS 
                              WHERE status_name = 'UNAVAILABLE') 
          WHERE coupon_id = ${body.coupon_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
