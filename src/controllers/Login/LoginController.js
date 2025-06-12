// controllers/LoginController.js
const AuthService = require("./LoginServices");

class LoginController {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.authenticate(email, password);

      if (result.error === "USER_NOT_FOUND") {
        return res
          .status(404)
          .json({ error: "There is no user with this email!" });
      }
      if (result.error === "INVALID_PASSWORD") {
        return res
          .status(401)
          .json({ error: "Wrong password, access denied!" });
      }

      return res.status(200).json({ token: result.token });
    } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new LoginController();
