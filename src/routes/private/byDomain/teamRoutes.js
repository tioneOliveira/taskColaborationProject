const express = require("express");
const TeamController = require("../../../controllers/Team/TeamController");
const freeAuth = require("../../../middlewares/freeAuth.js");
const roleAuth = require("../../../middlewares/roleAuth.js");
const teamRouter = express.Router();

// Cria um time
teamRouter.post("/team", freeAuth, roleAuth("Admin"), TeamController.newTeam);

// Deleta um time
teamRouter.delete(
  "/team/:id",
  freeAuth,
  roleAuth("Admin"),
  TeamController.deleteTeam
);

// Lista as tarefas em um time
teamRouter.get(
  "/team/:id/tasks",
  freeAuth,
  roleAuth("Admin", "Manager", "None"),
  TeamController.listTasksInTeam
);

// Lista todos os times
teamRouter.get(
  "/teams",
  freeAuth,
  roleAuth("Admin", "Manager", "None"),
  TeamController.listAllTeams
);

// Atualiza os dados de um time
teamRouter.put(
  "/team/:id",
  freeAuth,
  roleAuth("Admin", "Manager"),
  TeamController.updateTeam
);

// Lista os usuarios em um time
teamRouter.get(
  "/team/:id/users",
  freeAuth,
  roleAuth("Admin", "Manager", "None"),
  TeamController.listUsersInTeam
);

// Lista os dados de um time
teamRouter.get(
  "/team/:id",
  freeAuth,
  roleAuth("Admin", "Manager", "None"),
  TeamController.listTeam
);

module.exports = teamRouter;
