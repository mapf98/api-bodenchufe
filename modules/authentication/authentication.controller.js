const createError = require("http-errors");
const authenticationModel = require("./authentication.model");
const logger = require("../../config/logLevels");
const auth = require("../../middlewares/auth");
const Email = require("../../utils/Email");

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
      if (result[0] && result[0].status_name == "active") {
        let token = auth.createToken(req.body.user_id);
        logger.info("Inicio de sesion satisfactorio");
        res.json({
          status: "200",
          validation: true,
          token: token,
          response: result,
        });
      } else {
        if (result.length == 0) {
          logger.info("correo o contraseña invalidos");
          res.json({ validation: false });
        } else {
          logger.info("Usuario bloqueado");
          res.json({ error: "Usuario bloqueado", response: result });
        }
      }
    }
  },
  verifyEmail: async (req, res, next) => {
    let result = await authenticationModel.verifyEmail(req.con, req.params);
    if (result instanceof Error) {
      logger.error("Error en el modulo authentication (verifyEmail)");
      next(
        createError(500, `Error al verificar el correo (${result.message})`)
      );
    } else {
      if (result.length >= 1) {
        logger.info("Correo ya registrado");
        res.json({ registered: true });
      } else {
        logger.info("Correo disponible");
        res.json({ registered: false });
      }
    }
  },

  signUp: async (req, res, next) => {
    let result = await authenticationModel.signUp(req.con, req.body);
    if (result instanceof Error) {
      logger.error("Error en el modulo authentication (signUp)");
      return next(createError(500, `Error al registrarse (${result.message})`));
    }
    await new Email(result[0]).sendWelcome();

    logger.info("Usuario agregado correctamente");
    res.json({ status: 200 });
  },
};
