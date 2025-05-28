const express = require("express");
const TeamController = require("../controllers/TeamController");
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const TeamToTaskController = require("../controllers/TeamToTaskController");

const router = express.Router();

router.post("/team", TeamController.newTeam);
router.get("/team/:id", TeamController.listTeam);
router.get("/teams", TeamController.listAllTeams);
router.put("/team/:id", TeamController.updateTeam);
router.delete("/team/:id", TeamController.deleteTeam);

router.post("/user", UserController.newUser);
router.get("/user/:id", UserController.listUser);
router.get("/users", UserController.listAllUsers);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

router.post("/task", TaskController.newTask);
router.get("/task/:id", TaskController.listTask);
router.get("/tasks", TaskController.listAllTasks);
router.put("/task/:id", TaskController.updateTask);
router.delete("/task/:id", TaskController.deleteTask);

router.post(
  "/team/:team/task/:task",
  TeamToTaskController.assignTasksToTeamController
);
router.get("/teams/tasks", TeamToTaskController.listAllTeamsAssignedToTasks);
router.get("/team/:id/tasks", TeamToTaskController.listTasksAssignedToATeam);
router.get("/task/:id/teams", TeamToTaskController.listTeamsAssignedToATask);

module.exports = router;
