const cors = require("cors");
const express = require("express");

const teamRouter = require("../src/routes/private/byDomain/teamRoutes.js");
const taskRouter = require("../src/routes/private/byDomain/taskRoutes.js");
const userRouter = require("../src/routes/private/byDomain/userRoutes.js");
const loginRouter = require("../src/routes/public/loginRoute.js");

const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.json());

app.use(teamRouter);
app.use(taskRouter);
app.use(loginRouter);
app.use(userRouter);

app.get("/", (request, response) => {
  response.send("Hello world");
});

module.exports = { app, swaggerUi };
