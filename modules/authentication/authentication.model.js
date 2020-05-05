module.exports = {
  logIn: (con, body) => {
    return con
      .query(
        `SELECT * FROM EC_USER WHERE user_email= '${body.user_email}' AND user_password='${body.user_password}'`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
