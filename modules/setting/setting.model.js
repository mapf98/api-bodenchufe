module.exports = {
  //Se obtienen los parametros de configuracion como la comisión del procesador de pago y la comisión por servicios
  getAllSettings: (con) => {
    return con.query("SELECT * FROM EC_SETTING").catch((error) => {
      return new Error(error);
    });
  },

  updateSettings: (con, body) => {
    return con.result(
      `UPDATE EC_SETTING SET setting_payment_processor = ${body.setting_payment_processor}, setting_service_commission = ${body.setting_service_commission} WHERE setting_id = ${body.setting_id}`
    );
  },
};
