const express = require("express");
const TaskController = require("../../../controllers/TaskController");
const TeamController = require("../../../controllers/TeamController");
const UserController = require("../../../controllers/UserController");
const freeAuth = require("../../../middlewares/freeAuth.js");
const roleAuth = require("../../../middlewares/roleAuth.js");

const adminRouter = express.Router();

adminRouter.post("/task", freeAuth, roleAuth("Admin"), TaskController.newTask);
adminRouter.put("/team/:team/task/:task", TaskController.assignTaskToTeam);
adminRouter.delete("/task/:id", TaskController.deleteTask);

adminRouter.post("/team", TeamController.newTeam);
adminRouter.delete("/team/:id", TeamController.deleteTeam);

adminRouter.post("/user", UserController.newUser);
adminRouter.put("/team/:team/user/:user", UserController.assignUserToTeam);
adminRouter.delete("/user/:id", UserController.deleteUser);

module.exports = adminRouter;
