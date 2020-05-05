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

  logIn: async (req, res, next) => {
    result = await authenticationModel.logIn(req.con, req.body);

    if (result instanceof Error) {
      logger.error("Error en el modulo authentication (logIn)");
      next(
        createError(
          500,
          `Error al iniciar sesion en la aplicacion (${result.message})`
        )
      );
    } else {
      if (result[0].status_name == "active") {
        let token = auth.createToken(req.body.user_id);
        logger.info("Inicio de sesion satisfactorio");
        res.json({
          status: "200",
          token: token,
          response: result,
        });
      } else {
        logger.info("Usuario bloqueado");
        res.json({ error: "Usuario bloqueado", response: result });
      }
    }
  },
};
