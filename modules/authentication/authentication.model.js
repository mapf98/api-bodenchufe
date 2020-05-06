module.exports = {
  logIn: (con, body) => {
    return con
      .query(
        `SELECT E.user_id, E.user_first_name, E.user_first_lastname, E.user_second_name, E.user_second_lastname , E.user_birthdate, E.user_email, E.user_password, E.user_photo, E.fk_language_id, E.fk_rol_id, E.fk_status_id, S.status_name , L.language_name
         FROM EC_USER E, EC_STATUS S, EC_LANGUAGE L
         WHERE E.user_email= '${body.user_email}' 
         AND E.user_password='${body.user_password}'
         AND E.fk_status_id = S.status_id
         AND E.fk_language_id = L.language_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  signUp: (con, body) => {
    return con
      .query(
        `INSERT INTO EC_USER (user_first_name, user_first_lastname, user_birthdate, user_email, 
        user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id)
        VALUES ('${body.user_first_name}', '${body.user_first_lastname}', '${body.user_birthdate}',
        '${body.user_email}', ${body.user_password}, '${body.user_photo}', 
        (SELECT language_id FROM EC_LANGUAGE WHERE language_name = '${body.language_name}'), 
        (SELECT rol_id FROM EC_ROL WHERE rol_name = '${body.rol_name}'), 
        (SELECT status_id FROM EC_STATUS WHERE status_name = 'active')) RETURNING user_first_name,user_first_lastname,user_email`
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
