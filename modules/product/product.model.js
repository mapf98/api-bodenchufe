module.exports = {
  getProductsByProvider: (con, provider_id) => {
    return con
      .query(
        `SELECT PP.product_provider_id AS post_id,
                PRO.product_id,
                PRO.product_name,
                PRO.product_photo,
                PRO.product_long,
                PRO.product_height,
                PRO.product_width,
                CAT.category_name,
                PVD.provider_name,
                PP.product_provider_price,
                PP.product_provider_available_quantity,
                (SELECT AVG(QUAUX.qualification_stars) 
                FROM EC_QUALIFICATION AS QUAUX
                WHERE QUAUX.fk_product_provider_id = PP.product_provider_id) AS avg_qualification_stars,
                (SELECT OFRAUX.offer_rate
                FROM EC_OFFER AS OFRAUX,
                    EC_PRODUCT_PROVIDER AS PPAUX
                WHERE OFRAUX.offer_id = PPAUX.fk_offer_id
                    AND PPAUX.product_provider_id = PP.product_provider_id) AS offer_rate
        FROM EC_PRODUCT_PROVIDER AS PP,
            EC_PRODUCT AS PRO,
            EC_PROVIDER AS PVD,
            EC_STATUS AS STA,
            EC_CATEGORY AS CAT
        WHERE PP.fk_product_id = PRO.product_id 
            AND PP.fk_provider_id = PVD.provider_id
            AND STA.status_id = PP.fk_status_id
            AND CAT.category_id = PRO.fk_category_id
            AND STA.status_name = 'available'
            AND PVD.provider_id = ${provider_id}
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductsByOffer: (con, offer_id) => {
    return con
      .query(
        `SELECT PP.product_provider_id AS post_id,
                PRO.product_id,
                PRO.product_name,
                PRO.product_photo,
                PRO.product_long,
                PRO.product_height,
                PRO.product_width,
                CAT.category_name,
                PVD.provider_name,
                PP.product_provider_price,
                PP.product_provider_available_quantity,
                (SELECT AVG(QUAUX.qualification_stars) 
                FROM EC_QUALIFICATION AS QUAUX
                WHERE QUAUX.fk_product_provider_id = PP.product_provider_id) AS avg_qualification_stars,
                (SELECT OFRAUX.offer_rate
                FROM EC_OFFER AS OFRAUX,
                  EC_PRODUCT_PROVIDER AS PPAUX
                WHERE OFRAUX.offer_id = PPAUX.fk_offer_id
                  AND PPAUX.product_provider_id = PP.product_provider_id) AS offer_rate
          FROM EC_PRODUCT_PROVIDER AS PP,
            EC_PRODUCT AS PRO,
            EC_PROVIDER AS PVD,
            EC_STATUS AS STA,
            EC_CATEGORY AS CAT
          WHERE PP.fk_product_id = PRO.product_id 
            AND PP.fk_provider_id = PVD.provider_id
            AND STA.status_id = PP.fk_status_id
            AND CAT.category_id = PRO.fk_category_id
            AND STA.status_name = 'available'
            AND PP.fk_offer_id = ${offer_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductsByCategory: (con, category_id) => {
    return con
      .query(
        `SELECT PP.product_provider_id AS post_id,
                PRO.product_id,
                PRO.product_name,
                PRO.product_photo,
                PRO.product_long,
                PRO.product_height,
                PRO.product_width,
                CAT.category_name,
                PVD.provider_name,
                PP.product_provider_price,
                PP.product_provider_available_quantity,
                (SELECT AVG(QUAUX.qualification_stars) 
                FROM EC_QUALIFICATION AS QUAUX
                WHERE QUAUX.fk_product_provider_id = PP.product_provider_id) AS avg_qualification_stars,
                (SELECT OFRAUX.offer_rate
                FROM EC_OFFER AS OFRAUX,
                  EC_PRODUCT_PROVIDER AS PPAUX
                WHERE OFRAUX.offer_id = PPAUX.fk_offer_id
                  AND PPAUX.product_provider_id = PP.product_provider_id) AS offer_rate
          FROM EC_PRODUCT_PROVIDER AS PP,
            EC_PRODUCT AS PRO,
            EC_PROVIDER AS PVD,
            EC_STATUS AS STA,
            EC_CATEGORY AS CAT
          WHERE PP.fk_product_id = PRO.product_id 
            AND PP.fk_provider_id = PVD.provider_id
            AND STA.status_id = PP.fk_status_id
            AND CAT.category_id = PRO.fk_category_id
            AND STA.status_name = 'available'
            AND CAT.category_id = ${category_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductDetail: (con, postId) => {
    return con
      .query(
        `SELECT PP.product_provider_id AS post_id,
                PRO.product_id,
                PRO.product_name,
                PRO.product_photo,
                PRO.product_long,
                PRO.product_height,
                PRO.product_width,
                PRO.product_description,
                CAT.category_name,
                PVD.provider_name,
                PP.product_provider_price,
                PP.product_provider_available_quantity,
                (SELECT AVG(QUAUX.qualification_stars) 
                FROM EC_QUALIFICATION AS QUAUX
                WHERE QUAUX.fk_product_provider_id = PP.product_provider_id) AS avg_qualification_stars,
                (SELECT OFRAUX.offer_rate
                FROM EC_OFFER AS OFRAUX,
                  EC_PRODUCT_PROVIDER AS PPAUX
                WHERE OFRAUX.offer_id = PPAUX.fk_offer_id
                  AND PPAUX.product_provider_id = PP.product_provider_id) AS offer_rate
          FROM EC_PRODUCT_PROVIDER AS PP,
            EC_PRODUCT AS PRO,
            EC_PROVIDER AS PVD,
            EC_STATUS AS STA,
            EC_CATEGORY AS CAT
          WHERE PP.fk_product_id = PRO.product_id 
            AND PP.fk_provider_id = PVD.provider_id
            AND STA.status_id = PP.fk_status_id
            AND CAT.category_id = PRO.fk_category_id
            AND STA.status_name = 'selected'
            AND PP.product_provider_id = ${postId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductQualification: (con, postId) => {
    return con
      .query(
        `SELECT QUA.qualification_id,
                  QUA.qualification_commentary,
                  QUA.qualification_stars
          FROM EC_QUALIFICATION AS QUA
          WHERE QUA.fk_product_provider_id = ${postId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
