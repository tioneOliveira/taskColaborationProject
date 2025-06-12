const express = require("express");
const UserController = require("../../../controllers/User/UserController");
const userRouter = express.Router();

userRouter.post("/user", UserController.newUser);
userRouter.put("/team/:team/user/:user", UserController.assignUserToTeam);
userRouter.delete("/user/:id", UserController.deleteUser);

userRouter.put("/user/:id", UserController.updateUser);
userRouter.put("/user/:user/task/:task", UserController.assignUserWithTask);

userRouter.get("/user/:id/tasks", UserController.listTasksAssignedToUser);
userRouter.get("/user/:id", UserController.listUser);
userRouter.get("/users", UserController.listAllUsers);

module.exports = userRouter;
