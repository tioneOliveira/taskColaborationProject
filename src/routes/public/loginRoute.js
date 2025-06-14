const express = require("express");
const loginController = require("../../controllers/Login/LoginController");

const loginRouter = express.Router();

// Login, dá um token JWT
loginRouter.post("/login", loginController.loginUser);

module.exports = loginRouter;
