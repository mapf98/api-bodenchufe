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
            AND STA.status_name = 'AVAILABLE'
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
            AND STA.status_name = 'AVAILABLE'
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
            AND STA.status_name = 'AVAILABLE'
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
            AND STA.status_name = 'AVAILABLE'
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
  getAllProducts: (con, postId) => {
    return con.query(`SELECT * FROM EC_PRODUCT`).catch((error) => {
      return new Error(error);
    });
  },
  createProduct: (con, product) => {
    return con
      .query(
        `INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long, product_height, product_width, fk_category_id) 
          VALUES ('${product.product_name}', '${product.product_photo}', '${product.product_description}', 
                    '${product.product_long}', '${product.product_height}', '${product.product_width}', 
                      (SELECT category_id FROM EC_CATEGORY WHERE category_name = '${product.category_name}')) RETURNING product_id;
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  createPost: (con, post, product) => {
    return con
      .query(
        `INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id, fk_product_id, fk_offer_id, fk_status_id) 
          VALUES ('${post.provider_description}', ${post.provider_price}, 
          ${post.provider_available_quantity}, 
                    ${post.provider_id}, ${product}, 
                    ${
                      post.offer_rate !== undefined
                        ? `(SELECT offer_id FROM EC_OFFER WHERE offer_rate = '${post.offer_rate}')`
                        : null
                    }, 
                    (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE')) RETURNING product_provider_id
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
