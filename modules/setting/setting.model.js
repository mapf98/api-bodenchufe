module.exports = {
  getAllSettings: (con) => {
    return con.query("SELECT * FROM EC_SETTING").catch((error) => {
      return new Error(error);
    });
  },

  updateSettings: (con, body) => {
    return con.query(
      `UPDATE EC_SETTING SET setting_payment_processor = ${body.setting_payment_processor}, setting_service_commission = ${body.setting_service_commission} WHERE setting_id = ${body.setting_id}`
    );
  },
};
