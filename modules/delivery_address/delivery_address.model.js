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
          `SELECT * FROM EC_DELIVERY_ADDRESS WHERE fk_user_id = ${req.user_id}
           AND fk_status_id = (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE')`
        )
        .catch((error) => {
          return new Error(error);
        });
    }
  },
  updateAddressStatus: (req) => {
    return req.con
      .result(
        `UPDATE EC_DELIVERY_ADDRESS SET fk_status_id = 
        (SELECT status_id FROM EC_STATUS WHERE status_name = '${req.body.status_name}')
        WHERE fk_user_id = ${req.user_id}
        AND delivery_address_id = ${req.params.deliveryAddressId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
