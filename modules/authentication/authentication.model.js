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
};
