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
                CAT.fk_category_id,
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
            AND STA.status_name = 'ACTIVE'
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
                CAT.fk_category_id,
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
            AND STA.status_name = 'ACTIVE'
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
                CAT.fk_category_id,
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
            AND STA.status_name = 'ACTIVE'
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
                CAT.fk_category_id,
                CAT.category_id,
                PVD.provider_name,
                PVD.provider_id,
                PP.product_provider_price,
                PP.product_provider_available_quantity,
                PP.product_provider_description,
                (SELECT AVG(QUAUX.qualification_stars) 
                FROM EC_QUALIFICATION AS QUAUX
                WHERE QUAUX.fk_product_provider_id = PP.product_provider_id) AS avg_qualification_stars,
                (SELECT OFRAUX.offer_rate
                FROM EC_OFFER AS OFRAUX,
                  EC_PRODUCT_PROVIDER AS PPAUX
                WHERE OFRAUX.offer_id = PPAUX.fk_offer_id
                  AND PPAUX.product_provider_id = PP.product_provider_id) AS offer_rate,
                (SELECT OFRAUX.offer_id
                  FROM EC_OFFER AS OFRAUX,
                    EC_PRODUCT_PROVIDER AS PPAUX
                  WHERE OFRAUX.offer_id = PPAUX.fk_offer_id
                    AND PPAUX.product_provider_id = PP.product_provider_id) AS offer_id
          FROM EC_PRODUCT_PROVIDER AS PP,
            EC_PRODUCT AS PRO,
            EC_PROVIDER AS PVD,
            EC_STATUS AS STA,
            EC_CATEGORY AS CAT
          WHERE PP.fk_product_id = PRO.product_id 
            AND PP.fk_provider_id = PVD.provider_id
            AND STA.status_id = PP.fk_status_id
            AND CAT.category_id = PRO.fk_category_id
            AND STA.status_name = 'ACTIVE'
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
                    (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE')) RETURNING product_provider_id
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getPurchasedProducts: (req) => {
    return req.con
      .query(
        `SELECT FK_PRODUCT_PROVIDER_ID FROM EC_PRODUCT_PROVIDER_ORDER 
        WHERE FK_STATUS_ID = (SELECT STATUS_ID FROM EC_STATUS WHERE STATUS_NAME = 'PAID')
        AND FK_PRODUCT_PROVIDER_ID = ${req.params.productProviderId * 1}
        AND FK_USER_ID = ${req.user_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  createProductQualification: (req) => {
    return req.con
      .query(
        `INSERT INTO EC_QUALIFICATION 
        (qualification_commentary, qualification_stars, fk_product_provider_id,fk_user_id) 
        VALUES (
        '${req.body.qualification_commentary}', 
        ${req.body.qualification_stars},
        ${req.params.productProviderId},
        ${req.user_id})`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getDiscountOfProduct: (con, product_id) => {
    return con
      .query(
        `SELECT OFFER_RATE FROM EC_OFFER, EC_PRODUCT_PROVIDER 
        WHERE FK_OFFER_ID = OFFER_ID 
        AND PRODUCT_PROVIDER_ID = ${product_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateProductPhoto: (con, productId, photo) => {
    return con
      .result(
        `UPDATE EC_PRODUCT SET product_photo = '${photo}'
          WHERE product_id = ${productId}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductsByKeyword: (con, keyword) => {
    return con
      .query(
        `
        SELECT PPV.product_provider_id,
                PRO.product_name,
                PPV.product_provider_price
        FROM EC_PRODUCT AS PRO,
              EC_PROVIDER AS PRV,
              EC_PRODUCT_PROVIDER AS PPV,
              EC_STATUS AS STA
        WHERE PPV.fk_product_id = PRO.product_id
                AND PPV.fk_status_id = STA.status_id
                AND PPV.fk_provider_id = PRV.provider_id
                AND STA.status_name = 'ACTIVE'
                AND (product_name LIKE '%${keyword}%')
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getCategoriesByKeyword: (con, keyword) => {
    return con
      .query(
        `
        SELECT CAT.category_name,
                CAT.category_id
        FROM EC_CATEGORY AS CAT
        WHERE CAT.category_name LIKE '%${keyword}%'
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
