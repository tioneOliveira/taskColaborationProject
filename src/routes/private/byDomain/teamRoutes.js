const express = require("express");
const TeamController = require("../../../controllers/TeamController");
const freeAuth = require("../../../middlewares/freeAuth.js");
const roleAuth = require("../../../middlewares/roleAuth.js");
const teamRouter = express.Router();

teamRouter.post("/team", freeAuth, roleAuth("Admin"), TeamController.newTeam);
teamRouter.delete(
  "/team/:id",
  freeAuth,
  roleAuth("Admin"),
  TeamController.deleteTeam
);

teamRouter.get(
  "/team/:id/tasks",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  TeamController.listTasksInTeam
);
teamRouter.get(
  "/teams",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  TeamController.listAllTeams
);
teamRouter.put(
  "/team/:id",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  TeamController.updateTeam
);

teamRouter.get(
  "/team/:id/users",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  TeamController.listUsersInTeam
);
teamRouter.get(
  "/team/:id",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  TeamController.listTeam
);

module.exports = teamRouter;
