const app = require("./app");
const port = process.env.PORT;
const logger = require("./logger");

//Se levanta el servidor http
app.listen(port, () => logger.info(`Server running on port ${port}`));
