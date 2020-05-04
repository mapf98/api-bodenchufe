module.exports = {
  getProductsByCategory: (con, category_id) => {
    return con
      .query(
        `SELECT * FROM EC_CATEGORY AS CAT, EC_PRODUCT AS PRO WHERE CAT.category_id = PRO.fk_category_id AND PRO.fk_category_id = ${category_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
