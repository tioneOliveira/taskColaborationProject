const express = require("express");
const UserController = require("../controllers/UserController");

const userRouter = express.Router();

userRouter.post("/user", UserController.newUser);
userRouter.get("/user/:id", UserController.listUser);
userRouter.get("/users", UserController.listAllUsers);
userRouter.put("/user/:id", UserController.updateUser);
userRouter.delete("/user/:id", UserController.deleteUser);

module.exports = userRouter;
