const express = require("express");
const TeamToTaskController = require("../controllers/TeamToTaskController");

const teamToTaskRouter = express.Router();

teamToTaskRouter.post(
  "/team/:team/task/:task",
  TeamToTaskController.assignTasksToTeamController
);
teamToTaskRouter.get(
  "/teams/tasks",
  TeamToTaskController.listAllTeamsAssignedToTasks
);
teamToTaskRouter.get(
  "/team/:id/tasks",
  TeamToTaskController.listTasksAssignedToATeam
);
teamToTaskRouter.get(
  "/task/:id/teams",
  TeamToTaskController.listTeamsAssignedToATask
);
teamToTaskRouter.get(
  "/team/:team/task/:task",
  TeamToTaskController.listTaskAssignedToATeam
);

module.exports = teamToTaskRouter;
