module.exports = {
  getAllSettings: (con) => {
    return con.query("SELECT * FROM EC_SETTING").catch((error) => {
      return new Error(error);
    });
  },

  updateSettings: (con, body) => {
    return con.query(
      "UPDATE EC_SETTING SET setting_payment_processor = $2, setting_service_commission = $3 WHERE setting_id = $1",
      [
        body.setting_id,
        body.setting_payment_processor,
        body.setting_service_commission,
      ]
    );
  },
};
