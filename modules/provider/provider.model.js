module.exports = {
  getMainProviders: (con) => {
    return con
      .query(
        `
        SELECT * 
        FROM EC_PROVIDER AS PV,
            EC_STATUS AS STA
        WHERE PV.fk_status_id = STA.status_id
                AND STA.status_name = 'ACTIVE'
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getAllProviders: (con) => {
    return con
      .query(
        `SELECT PRV.provider_id,	
                PRV.provider_name,
                PRV.provider_description,
                STA.status_name,
                (SELECT COUNT(*)
                FROM EC_PRODUCT_PROVIDER AS PPV,
                    EC_PROVIDER AS PRVAUX
                WHERE PPV.fk_provider_id = PRVAUX.provider_id
                    AND PRVAUX.provider_id = PRV.provider_id) AS provider_posts
          FROM EC_PROVIDER AS PRV,
          EC_STATUS AS STA
          WHERE PRV.fk_status_id = STA.status_id
          ORDER BY PRV.provider_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProvidersProducts: (con, providerId) => {
    return con
      .query(
        `SELECT PRO.product_photo,
                  PRO.product_name,
                  PPV.product_provider_id,
                  PPV.product_provider_available_quantity,
                  PPV.product_provider_price,
                  PPV.product_provider_description,
                  (SELECT SS.status_name
                   FROM EC_STATUS SS
                   WHERE PPV.fk_status_id = SS.status_id
                    ) as product_status,
                  (SELECT OFRAUX.offer_rate
                  FROM EC_OFFER AS OFRAUX,
                      EC_PRODUCT_PROVIDER AS PPVAUX
                  WHERE OFRAUX.offer_id = PPVAUX.fk_offer_id
                      AND PPVAUX.product_provider_id = PPV.product_provider_id) AS product_discount_rate,
                   (SELECT OFRAUX.offer_id
                  FROM EC_OFFER AS OFRAUX,
                      EC_PRODUCT_PROVIDER AS PPVAUX
                  WHERE OFRAUX.offer_id = PPVAUX.fk_offer_id
                      AND PPVAUX.product_provider_id = PPV.product_provider_id) AS product_discount_id
          FROM EC_PRODUCT_PROVIDER AS PPV,
              EC_PRODUCT AS PRO,
              EC_PROVIDER AS PVD
          WHERE PPV.fk_product_id = PRO.product_id
              AND PPV.fk_provider_id = PVD.provider_id
              AND PVD.provider_id = ${providerId}
          ORDER BY PPV.product_provider_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  createProvider: (con, provider) => {
    return con
      .query(
        `INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) 
          VALUES ('${provider.provider_name}', '${provider.provider_description}', (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE')) RETURNING provider_id`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateStatusProvider: (con, provider) => {
    return con
      .result(
        `UPDATE EC_PROVIDER
          SET fk_status_id = (SELECT status_id FROM EC_STATUS AS STA WHERE STA.status_name = '${provider.status_name}') 
          WHERE provider_id = ${provider.provider_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getProductsProviderToUpdate: (con, provider) => {
    return con
      .result(
        `
        SELECT PPV.product_provider_id
        FROM EC_PROVIDER AS PV,
              EC_PRODUCT_PROVIDER AS PPV,
              EC_PRODUCT AS PRO,
              EC_STATUS AS STA
        WHERE PPV.fk_product_id = PRO.product_id
                AND PPV.fk_provider_id = PV.provider_id
                AND PPV.fk_status_id = STA.status_id
                AND STA.status_name = 'ACTIVE'
                AND PV.provider_id = ${provider.provider_id}
        `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateProvider: (con, provider) => {
    return con
      .result(
        `UPDATE EC_PROVIDER
          SET provider_name = '${provider.provider_name}',
              provider_description = '${provider.provider_description}'
          WHERE provider_id = ${provider.provider_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateStatusProductProvider: (con, provider) => {
    return con
      .result(
        `UPDATE EC_PRODUCT_PROVIDER
          SET fk_status_id = (SELECT status_id FROM EC_STATUS AS STA WHERE STA.status_name = '${provider.status_name}') 
          WHERE product_provider_id = ${provider.post_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  updateProductProvider: (con, post) => {
    return con
      .result(
        `UPDATE EC_PRODUCT_PROVIDER
          SET product_provider_description = ${
            post.description != null ? `'${post.description}'` : null
          },
            product_provider_price = ${post.price},
            product_provider_available_quantity = ${post.available_quantity},	
            fk_offer_id = (SELECT offer_id FROM EC_OFFER AS OFR WHERE OFR.offer_rate = '${
              post.offer_rate
            }') 
          WHERE product_provider_id = ${post.post_id}`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
