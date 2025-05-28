require("dotenv").config();
const listeningToPort = process.env.LISTENING_TO_PORT;
const cors = require("cors");
const express = require("express");
const router = require("./src/routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(listeningToPort, () => {
  console.log("Aplication running on port: " + listeningToPort);
});

app.get("/", (request, response) => {
  response.send("Hello world");
});
