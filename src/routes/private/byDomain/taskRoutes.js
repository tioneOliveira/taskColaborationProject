const express = require("express");
const TaskController = require("../../../controllers/TaskController");
const taskRouter = express.Router();

taskRouter.post("/task", TaskController.newTask);
taskRouter.put("/team/:team/task/:task", TaskController.assignTaskToTeam);
taskRouter.delete("/task/:id", TaskController.deleteTask);

taskRouter.put("/task/:id", TaskController.updateTask);

taskRouter.get("/tasks", TaskController.listAllTasks);
taskRouter.get("/task/:id", TaskController.listTask);

module.exports = taskRouter;
