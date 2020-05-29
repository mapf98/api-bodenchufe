module.exports = {
  //Al iniciar sesión valida si el password es NULL debido a que el inicio de sesión cuando es federado no lo requiere.
  logIn: (con, body) => {
    return con
      .query(
        `SELECT E.user_id, E.user_first_name, E.user_first_lastname, E.user_second_name, 
         E.user_second_lastname , E.user_birthdate, E.user_email, E.user_password, E.user_photo,
         E.fk_language_id, E.fk_rol_id, E.fk_status_id, S.status_name , L.language_name, R.rol_name
         FROM EC_USER E, EC_STATUS S, EC_LANGUAGE L, EC_ROL R
         WHERE E.user_email= '${body.user_email}' 
         AND E.user_password ${
           body.user_password === null
             ? `IS ${body.user_password}`
             : `= '${body.user_password}'`
         }
         AND E.fk_status_id = S.status_id
         AND E.fk_language_id = L.language_id
         AND E.fk_rol_id = R.rol_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  //Al momento del registro, la fecha puede ser null
  //Cuando se inicia sesión de forma federada, se guardan los datos del usuario ya sea por google o facebook, estos no tienen contraseña y se valida en tal caso si es NULL
  signUp: (con, body) => {
    return con
      .query(
        `INSERT INTO EC_USER (user_first_name, user_first_lastname, user_birthdate, user_email, 
        user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id)
        VALUES ('${body.user_first_name}', '${body.user_first_lastname}', ${
          body.user_birthdate === null ? null : `'${body.user_birthdate}'`
        },
        '${body.user_email}', ${
          body.user_password === null ? null : `'${body.user_password}'`
        }, '${body.user_photo}', 
        (SELECT language_id FROM EC_LANGUAGE WHERE language_name = '${
          body.language_name
        }'), 
        (SELECT rol_id FROM EC_ROL WHERE rol_name = '${body.rol_name}'), 
        (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE')) RETURNING user_id, user_first_name,user_first_lastname,user_email,user_password`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  verifyEmail: (con, body) => {
    return con
      .query(
        `SELECT user_email FROM EC_USER WHERE user_email = '${body.user_email}'`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  addWelcomeCoupon: (con, userId) => {
    return con.query(`INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_status_id, fk_user_id)
                      VALUES ('WelcomeCoupon', '50%', 1, 30000, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'), ${userId})`);
  },
};
