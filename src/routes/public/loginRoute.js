const express = require("express");
const loginController = require("../../controllers/Login/LoginController");
const EmailService = require("../../utils/mailer");

const loginRouter = express.Router();

loginRouter.post("/login", loginController.loginUser);

loginRouter.post("/email", () => {
  EmailService("tionefilho@gmail.com", "teste", "teste");
});

module.exports = loginRouter;
