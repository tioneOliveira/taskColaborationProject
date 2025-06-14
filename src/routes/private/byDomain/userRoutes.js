const express = require("express");
const UserController = require("../../../controllers/User/UserController");
const freeAuth = require("../../../middlewares/freeAuth.js");
const roleAuth = require("../../../middlewares/roleAuth.js");
const userRouter = express.Router();

// Cria novo usuario
userRouter.post("/user", freeAuth, roleAuth("Admin"), UserController.newUser);

// Coloca um usuario em um time
userRouter.put(
  "/team/:team/user/:user",
  freeAuth,
  roleAuth("Admin"),
  UserController.assignUserToTeam
);

// Deleta um usuario
userRouter.delete(
  "/user/:id",
  freeAuth,
  roleAuth("Admin"),
  UserController.deleteUser
);

// Atualiza as informações de um usuario
userRouter.put(
  "/user/:id",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  UserController.updateUser
);

// Dá uma tarefa a um usuario, ambos usuario e tarefa devem pertencer a um mesmo time
userRouter.put(
  "/user/:user/task/:task",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  UserController.assignUserWithTask
);

// Lista as tarefas dadas a um usuario
userRouter.get(
  "/user/:id/tasks",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  UserController.listTasksAssignedToUser
);

// Lista dados de um usuario
userRouter.get(
  "/user/:id",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  UserController.listUser
);

// Lista todos os usuarios
userRouter.get(
  "/users",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  UserController.listAllUsers
);

module.exports = userRouter;
