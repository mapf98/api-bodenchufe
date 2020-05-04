module.exports = {
  getProductsByProvider: (con, provider_id) => {
    return con
      .query(
        `SELECT PRO.* FROM EC_PROVIDER AS PVD, EC_PRODUCT AS PRO, EC_PRODUCT_PROVIDER AS PP 
          WHERE PVD.provider_id = PP.fk_provider_id 
            AND PRO.product_id = PP.fk_product_id 
            AND PVD.provider_id = ${provider_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductsByOffer: (con, offer_id) => {
    return con
      .query(
        `SELECT * FROM EC_PRODUCT AS PRO, EC_OFFER AS OFR 
          WHERE PRO.fk_offer_id = OFR.offer_id
            AND OFR.offer_id = ${offer_id}`)
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductsByCategory: (con, category_id) => {
    return con
      .query(
        `SELECT * FROM EC_CATEGORY AS CAT, EC_PRODUCT AS PRO 
          WHERE CAT.category_id = PRO.fk_category_id 
            AND PRO.fk_category_id = ${category_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
