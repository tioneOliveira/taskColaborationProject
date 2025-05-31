const express = require("express");
const TaskController = require("../../../controllers/TaskController");
const freeAuth = require("../../../middlewares/freeAuth.js");
const roleAuth = require("../../../middlewares/roleAuth.js");
const taskRouter = express.Router();

taskRouter.post("/task", freeAuth, roleAuth("Admin"), TaskController.newTask);
taskRouter.put(
  "/team/:team/task/:task",
  freeAuth,
  roleAuth("Admin"),
  TaskController.assignTaskToTeam
);
taskRouter.delete(
  "/task/:id",
  freeAuth,
  roleAuth("Admin"),
  TaskController.deleteTask
);

taskRouter.put(
  "/task/:id",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  TaskController.updateTask
);

taskRouter.get(
  "/tasks",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  TaskController.listAllTasks
);
taskRouter.get(
  "/task/:id",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  TaskController.listTask
);

module.exports = taskRouter;
