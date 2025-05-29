require("dotenv").config();
const listeningToPort = process.env.LISTENING_TO_PORT;
const cors = require("cors");
const express = require("express");

const teamRouter = require("./src/routes/teamRoutes");
const taskRouter = require("./src/routes/taskRoutes");
const userRouter = require("./src/routes/userRoutes");
const teamToTaskRouter = require("./src/routes/teamToTaskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(teamRouter);
app.use(taskRouter);
app.use(userRouter);
app.use(teamToTaskRouter);

app.listen(listeningToPort, () => {
  console.log("Aplication running on port: " + listeningToPort);
});

app.get("/", (request, response) => {
  response.send("Hello world");
});
