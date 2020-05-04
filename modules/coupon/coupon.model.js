module.exports = {
  getCoupons: (con) => {
    return con.query("SELECT * FROM EC_COUPON").catch((error) => {
      return new Error(error);
    });
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
