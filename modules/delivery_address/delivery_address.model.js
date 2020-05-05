module.exports = {
  getDeliveryAddresses: (req) => {
    if (req.originalUrl === "/bodenchufe/api/delivery-address") {
      return req.con
        .query(`SELECT * FROM EC_DELIVERY_ADDRESS`)
        .catch((error) => {
          return new Error(error);
        });
    } else if (req.originalUrl === "/bodenchufe/api/user/deliveryAddress") {
      return req.con
        .query(
          `SELECT * FROM EC_DELIVERY_ADDRESS WHERE FK_USER_ID = ${req.user_id}`
        )
        .catch((error) => {
          return new Error(error);
        });
    }
  },
};
