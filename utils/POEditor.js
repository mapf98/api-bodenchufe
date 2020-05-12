const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  getTranslateTexts: (language) => {
    const form = new FormData();
    form.append("api_token", process.env.API_TOKEN_POE);
    form.append("id", process.env.POE_ID_PROJECT);
    form.append("language", language);
    return axios
      .post("https://api.poeditor.com/v2/terms/list", form, {
        headers: form.getHeaders(),
      })
      .catch((error) => {
        return new Error(error);
      });
  },
};
