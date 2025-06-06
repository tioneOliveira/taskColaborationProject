const express = require("express");
const UserController = require("../../../controllers/UserController");
const freeAuth = require("../../../middlewares/freeAuth.js");
const roleAuth = require("../../../middlewares/roleAuth.js");
const userRouter = express.Router();

userRouter.post("/user", UserController.newUser);
userRouter.put(
  "/team/:team/user/:user",
  freeAuth,
  roleAuth("Admin"),
  UserController.assignUserToTeam
);
userRouter.delete(
  "/user/:id",
  freeAuth,
  roleAuth("Admin"),
  UserController.deleteUser
);

userRouter.put(
  "/user/:id",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  UserController.updateUser
);
userRouter.put(
  "/user/:user/task/:task",
  freeAuth,
  roleAuth("Admin", "Maneger"),
  UserController.assignUserWithTask
);

userRouter.get(
  "/user/:id/tasks",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  UserController.listTasksAssignedToUser
);
userRouter.get(
  "/user/:id",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  UserController.listUser
);
userRouter.get(
  "/users",
  freeAuth,
  roleAuth("Admin", "Maneger", "None"),
  UserController.listAllUsers
);
module.exports = userRouter;
