// src/config/swagger.js
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// Caminho absoluto do arquivo swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../swagger.json"), "utf8")
);

module.exports = {
  swaggerUi,
  swaggerDocument,
};
