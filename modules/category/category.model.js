module.exports = {
  getAllCategories: (con) => {
    return con.query("SELECT * FROM EC_CATEGORY").catch((error) => {
      return new Error(error);
    });
  },
};
