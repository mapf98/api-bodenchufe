const createError = require("http-errors");
const logger = require("../../config/logLevels");
const POEditor = require("../../utils/POEditor");

module.exports = {
  getTextsByLanguage: async (req, res, next) => {
    let texts = await POEditor.getTranslateTexts(req.params.language);
    let terms = [];
    texts.data.result.terms.forEach((term) => {
      terms.push({
        termName: term.term,
        termTranslation: term.translation.content,
      });
    });
    if (texts instanceof Error) {
      logger.error(
        "Error en el módulo language (POST /language/:language - getTextsByLanguage())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obetener la traducción correspondiente para los textos en un idioma [LANGUAGE: ${req.params.language}] (${texts.message})`
        )
      );
    } else {
      logger.info(
        `Se obtuvo satisfactoriamente la traducción para los textos de acuerdo a un idioma [LANGUAGE: ${req.params.language}]`
      );
      res.json({ obtained: true, terms: terms });
    }
  },
};
