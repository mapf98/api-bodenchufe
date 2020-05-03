module.exports = {
  getAllSettings: (con) => {
    return con.query("SELECT * FROM EC_SETTING").catch((error) => {
      return new Error(error);
    });
  },

  updateSettings: (con, body) => {
    return con.query(
      "UPDATE EC_SETTING SET SETTING_PAYMENT_PROCESSOR = $2, SETTING_SERVICE_COMMISSION = $3 WHERE SETTING_ID = $1",
      [
        body.setting_id,
        body.setting_payment_processor,
        body.setting_service_commission,
      ]
    );
  },
};
