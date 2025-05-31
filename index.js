require("dotenv").config();

const listeningToPort = process.env.LISTENING_TO_PORT;

const cors = require("cors");
const express = require("express");

const teamRouter = require("./src/routes/private/byDomain/teamRoutes.js");
const taskRouter = require("./src/routes/private/byDomain/taskRoutes.js");
const userRouter = require("./src/routes/private/byDomain/userRoutes.js");
const loginRouter = require("./src/routes/public/loginRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use(teamRouter);
app.use(taskRouter);
app.use(loginRouter);
app.use(userRouter);

app.listen(listeningToPort, () => {
  console.log("Aplication running on port: " + listeningToPort);
});

app.get("/", (request, response) => {
  response.send("Hello world");
});
