const express = require("express");
const TeamController = require("../controllers/TeamController");
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const AssignTarefasEquipeController = require("../controllers/AssignTarefasEquipesController");

const router = express.Router();

router.post("/team", TeamController.newTeam);
router.get("/teams", TeamController.listAllTeams);
router.put("/team/:id", TeamController.updateTeam);
router.delete("/team/:id", TeamController.deleteTeam);

router.post("/user", UserController.newoUser);
router.get("/users", UserController.listAllUsers);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

router.post("/task", TaskController.newTask);
router.get("/tasks", TaskController.listAllTasks);
router.put("/task/:id", TaskController.updateTask);
router.delete("/task/:id", TaskController.deleteTask);

module.exports = router;
