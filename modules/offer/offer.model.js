module.exports = {
  getAllOffers: (con) => {
    return con.query(`SELECT * FROM EC_OFFER`).catch((error) => {
      return new Error(error);
    });
  },
};
