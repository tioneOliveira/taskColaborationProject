const express = require("express");
const TeamController = require("../../../controllers/TeamController");
const teamRouter = express.Router();

teamRouter.post("/team", TeamController.newTeam);
teamRouter.delete("/team/:id", TeamController.deleteTeam);

teamRouter.get("/team/:id/tasks", TeamController.listTasksInTeam);
teamRouter.get("/teams", TeamController.listAllTeams);
teamRouter.put("/team/:id", TeamController.updateTeam);

teamRouter.get("/team/:id/users", TeamController.listUsersInTeam);
teamRouter.get("/team/:id", TeamController.listTeam);

module.exports = teamRouter;
