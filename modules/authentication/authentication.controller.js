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
    let email = await authenticationModel.verifyEmail(req.con, req.body);
    let result = await authenticationModel.logIn(req.con, req.body);
    if (result instanceof Error || email instanceof Error) {
      logger.error(
        "Error en el módulo authentication (POST /authentication/login - logIn())"
      );
      res.json({validated: false});
      next(
        createError(
          500,
          `Error en inicio de sesión [USER_EMAIL: ${req.body.user_email} | PASSWORD: ${req.body.user_password}] (${result.message})`
        )
      );
    } else {
      if (result[0] && result[0].status_name == "ACTIVE") {
        let token = auth.createToken(result[0]);
        logger.info(
          `Inicio de sesión satisfactorio [USER_EMAIL: ${req.body.user_email} | PASSWORD: ${req.body.user_password}]`
        );
        res.json({
          validated: true,
          token: token,
          user: result,
        });
      } else {
        if (result.length == 0 && email.length != 0) {
          logger.error(
            `Combinación de correo electrónico y password incorrecta [USER_EMAIL: ${req.body.user_email} | PASSWORD: ${req.body.user_password}]`
          );
          res.json({ validated: false });
        } else if (email.length == 0 && result.length == 0) {
          logger.info(`El correo que ingresó no está registrado [USER_EMAIL: ${req.body.user_email}]`);
          res.json({ registered: false });
        } else {
          logger.info(`Usuario bloqueado [USER_EMAIL: ${req.body.user_email}]`);
          res.json({ validated: false, blocked: true });
        }
      }
    }
  },
  verifyEmail: async (req, res, next) => {
    let result = await authenticationModel.verifyEmail(req.con, req.params);
    if (result instanceof Error) {
      logger.error(
        "Error en el módulo authentication (POST /authentication/login - verifyEmail())"
      );
      res.json({ available: false });
      next(
        createError(
          500,
          `Error al verificar el correo [USER_EMAIL: ${req.params.emailUser}] (${result.message})`
        )
      );
    } else {
      if (result.length >= 1) {
        logger.info(`Correo registrado [USER_EMAIL: ${req.params.emailUser}]`);
        res.json({ available: false });
      } else {
        logger.info(`Correo disponible [USER_EMAIL: ${req.params.emailUser}]`);
        res.json({ available: true });
      }
    }
  },
  signUp: async (req, res, next) => {
    let result = await authenticationModel.signUp(req.con, req.body);

    if (result instanceof Error) {
      logger.error(
        "Error en el módulo authentication (POST /authentication/signUp - signUp())"
      );
      res.json({ registered: false });
      return next(
        createError(
          500,
          `Error en el registro de usuario [USER_EMAIL: ${req.body.user_email}] (${result.message})`
        )
      );
    }

    let addCouponToUser = await authenticationModel.addWelcomeCoupon(
      req.con,
      result[0].user_id
    );
    new Email(result[0]).sendWelcome();

    logger.info(
      `Usuario registrado satisfactoriamente [USER_EMAIL: ${req.body.user_email}]`
    );
    res.json({ registered: true });
  },
};
