const createError = require("http-errors");
const authenticationModel = require("./authentication.model");
const logger = require("../../config/logLevels");
const auth = require("../../middlewares/auth");

module.exports = {
  getToken: (req, res, next) => {
    const user_id_test = 1;
    const token = auth.createToken(user_id_test, process.env.SECRET_TOKEN);
    res.json({
      token: token,
      user_id: user_id_test,
    });
  },
};
