const express = require("express");
const TeamController = require("../controllers/TeamController");

const teamRouter = express.Router();

teamRouter.post("/team", TeamController.newTeam);
teamRouter.get("/team/:id", TeamController.listTeam);
teamRouter.get("/teams", TeamController.listAllTeams);
teamRouter.put("/team/:id", TeamController.updateTeam);
teamRouter.delete("/team/:id", TeamController.deleteTeam);

module.exports = teamRouter;
