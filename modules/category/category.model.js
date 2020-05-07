module.exports = {
  updateCategory: (con, body) => {
    con
      .query(
        `UPDATE EC_CATEGORY SET category_name = '${body.category_name}'
               WHERE category_id = ${body.category_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getMainCategories: (con) => {
    return con
      .query("SELECT * FROM EC_CATEGORY WHERE fk_category_id IS NULL")
      .catch((error) => {
        return new Error(error);
      });
  },
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
