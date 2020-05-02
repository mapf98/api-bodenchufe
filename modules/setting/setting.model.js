module.exports = {
    getAllSettings: (con) => {
        return con.query('SELECT * FROM EC_SETTING').catch((error) =>{
            return  new Error(error);
        });
    },
};
