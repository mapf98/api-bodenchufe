module.exports = {
  signUp: (con, body) => {
    return con
      .query(
        `INSERT INTO EC_USER (user_first_name, user_first_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id)
       VALUES ('${body.user_first_name}', '${body.user_first_lastname}', '${body.user_birthdate}', '${body.user_email}', ${body.user_password}, '${body.user_photo}', (SELECT language_id FROM EC_LANGUAGE WHERE language_name = '${body.language_name}'), (SELECT rol_id FROM EC_ROL WHERE rol_name = '${body.rol_name}'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'active'))`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  verifyEmail: (con, params) => {
    return con
      .query(
        `SELECT user_email FROM EC_USER WHERE user_email = '${params.emailUser}'`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
