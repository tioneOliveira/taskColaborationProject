const express = require("express");
const TaskController = require("../../../controllers/Task/TaskController");
const freeAuth = require("../../../middlewares/freeAuth.js");
const roleAuth = require("../../../middlewares/roleAuth.js");
const taskRouter = express.Router();

// Cria uma terefa
taskRouter.post("/task", freeAuth, roleAuth("Admin"), TaskController.newTask);

// Dá uma tarefa a um time
taskRouter.put(
  "/team/:team/task/:task",
  freeAuth,
  roleAuth("Admin"),
  TaskController.assignTaskToTeam
);

// Deleta uma tarefa
taskRouter.delete(
  "/task/:id",
  freeAuth,
  roleAuth("Admin"),
  TaskController.deleteTask
);

// Muda os dados de uma tarefa
taskRouter.put(
  "/task/:id",
  freeAuth,
  roleAuth("Admin", "Manager"),
  TaskController.updateTask
);

// Lista todas as tarefas
taskRouter.get(
  "/tasks",
  freeAuth,
  roleAuth("Admin", "Manager", "None"),
  TaskController.listAllTasks
);

// Lista os dados de uma tarefa especifica
taskRouter.get(
  "/task/:id",
  freeAuth,
  roleAuth("Admin", "Manager", "None"),
  TaskController.listTask
);

module.exports = taskRouter;
