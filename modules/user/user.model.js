module.exports = {
  getAllUsers: (con) => {
    return con.query("SELECT * FROM EC_USER").catch((error) => {
      return new Error(error);
    });
  },
};
