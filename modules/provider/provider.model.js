module.exports = {
  getAllProviders: (con) => {
    return con.query("SELECT * FROM EC_PROVIDER").catch((error) => {
      return new Error(error);
    });
  },
};
