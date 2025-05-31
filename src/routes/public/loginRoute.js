const express = require("express");
const loginController = require("../../controllers/LoginController.js");

const loginRouter = express.Router();

loginRouter.post("/login", loginController.loginUser);

module.exports = loginRouter;
