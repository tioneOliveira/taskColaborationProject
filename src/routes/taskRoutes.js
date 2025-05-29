const express = require("express");
const TaskController = require("../controllers/TaskController");

const taskRouter = express.Router();

taskRouter.post("/task", TaskController.newTask);
taskRouter.get("/task/:id", TaskController.listTask);
taskRouter.get("/tasks", TaskController.listAllTasks);
taskRouter.put("/task/:id", TaskController.updateTask);
taskRouter.put("/team/:team/task/:task", TaskController.assignTaskToTeam);

taskRouter.delete("/task/:id", TaskController.deleteTask);

module.exports = taskRouter;
