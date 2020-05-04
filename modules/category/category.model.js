module.exports = {
  getMainCategories: (con) => {
    return con
      .query("SELECT * FROM EC_CATEGORY WHERE fk_category_id IS NULL")
      .catch((error) => {
        return new Error(error);
      });
  },
};
