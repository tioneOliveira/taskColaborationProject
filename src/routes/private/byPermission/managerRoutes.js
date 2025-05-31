const express = require("express");
const TaskController = require("../../../controllers/TaskController");
const TeamController = require("../../../controllers/TeamController");
const UserController = require("../../../controllers/UserController");

const managerRouter = express.Router();

managerRouter.put("/task/:id", TaskController.updateTask);

managerRouter.get("/team/:id/tasks", TeamController.listTasksInTeam);
managerRouter.get("/teams", TeamController.listAllTeams);
managerRouter.put("/team/:id", TeamController.updateTeam);

managerRouter.put("/user/:id", UserController.updateUser);
managerRouter.put("/user/:user/task/:task", UserController.assignUserWithTask);

module.exports = managerRouter;
