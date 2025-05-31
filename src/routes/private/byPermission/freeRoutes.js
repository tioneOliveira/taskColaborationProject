const express = require("express");
const TaskController = require("../../../controllers/TaskController");
const TeamController = require("../../../controllers/TeamController");
const UserController = require("../../../controllers/UserController");

const managerRouter = express.Router();

taskRouter.get("/tasks", TaskController.listAllTasks);
taskRouter.get("/task/:id", TaskController.listTask);

teamRouter.get("/team/:id/users", TeamController.listUsersInTeam);
teamRouter.get("/team/:id", TeamController.listTeam);

userRouter.get("/user/:id/tasks", UserController.listTasksAssignedToUser);
userRouter.get("/user/:id", UserController.listUser);
userRouter.get("/users", UserController.listAllUsers);
module.exports = userRouter;
