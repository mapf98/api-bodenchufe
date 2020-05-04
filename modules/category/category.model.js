module.exports = {
  updateCategory: (con, body) => {
    con.query(`UPDATE EC_CATEGORY SET category_name = '${body.category_name}'
               WHERE category_id = ${body.category_id}`);
  },
};
