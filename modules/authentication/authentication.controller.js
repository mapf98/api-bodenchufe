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

  signUp: async (req, res, next) => {
    let result = await authenticationModel.signUp(req.con, req.body);
    if (result instanceof Error) {
      logger.error("Error en el modulo authentication (signUp)");
      next(createError(500, `Error al registrarse (${result.message})`));
      res.json({ error: "23505" });
    } else {
      logger.info("Usuario agregado correctamente");
      res.json({ status: 200 });
    }
  },
};
