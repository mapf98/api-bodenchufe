module.exports = {
  createCategory: (con, body) => {
    con
      .query(
        `INSERT INTO EC_CATEGORY  (category_name, fk_category_id) VALUES ('${body.category_name}', ${body.fk_category_id})`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getAllCategories: (con) => {
    return con.query("SELECT * FROM EC_CATEGORY").catch((error) => {
      return new Error(error);
    });

  },
};
