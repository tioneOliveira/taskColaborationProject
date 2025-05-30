const express = require("express");
const UserController = require("../controllers/UserController");

const userRouter = express.Router();

userRouter.post("/user", UserController.newUser);
userRouter.put("/team/:team/user/:user", UserController.assignUserToTeam);
userRouter.put("/user/:id", UserController.updateUser);
userRouter.put("/user/:user/task/:task", UserController.assignUserWithTask);
userRouter.get("/user/:id", UserController.listUser);
userRouter.get("/users", UserController.listAllUsers);
userRouter.get("/user/:id/tasks", UserController.listTasksAssignedToUser);
userRouter.delete("/user/:id", UserController.deleteUser);

module.exports = userRouter;
