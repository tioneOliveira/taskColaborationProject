require("dotenv").config();
const client = process.env.DATABASE_CLIENT;
const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

let knex = require("knex")({
  client: client,
  connection: {
    host: host,
    user: user,
    password: password,
    database: database,
  },
});

module.exports = knex;
