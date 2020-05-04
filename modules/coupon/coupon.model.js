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
  updateCoupon: (con, body) => {
    return con.query(
      "UPDATE EC_COUPON SET coupon_name = $2, coupon_discount_rate = $3 WHERE coupon_id = $1",
      [body.coupon_id, body.coupon_name, body.coupon_discount_rate]
    );
  },
  disableCoupon: (con, body) => {
    console.log(body);
    return con
      .query(
        `UPDATE EC_COUPON 
         SET fk_status_id = (SELECT status_id 
                             FROM EC_STATUS 
                             WHERE status_name = '${body.statusName}') 
         WHERE coupon_id = ${body.coupon_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
