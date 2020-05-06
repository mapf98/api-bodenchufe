module.exports = {
  getAllProviders: (con) => {
    return con.query("SELECT * FROM EC_PROVIDER").catch((error) => {
      return new Error(error);
    });
  },
  createProvider: (con, provider) => {
    console.log(provider);
    return con
      .query(
        `INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) 
          VALUES ('${provider.provider_name}', '${provider.provider_description}', (SELECT status_id FROM EC_STATUS WHERE status_name = 'active'))`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
