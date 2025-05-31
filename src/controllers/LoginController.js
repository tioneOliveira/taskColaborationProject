const database = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

class LoginController {
  async loginUser(request, response) {
    try {
      const { email, password } = request.body;

      const user = await database
        .table("User")
        .where({ email_user: email, deleted_at_user: null })
        .first();

      if (!user) {
        return response
          .status(404)
          .json({ error: "There is no user with this email!" });
      }

      const passwordValid = await bcrypt.compare(password, user.password_user);

      if (!passwordValid) {
        return response
          .status(401)
          .json({ error: "Wrong password, access denied!" });
      }

      const token = jwt.sign(
        {
          id: user.id_user,
          team: user.id_team_user,
          permission: user.permission_user,
        },
        jwtSecretKey,
        {
          expiresIn: "1d",
        }
      );

      console.log(user, token);
      response.status(200).json({ token: token });
    } catch (error) {
      console.log("Something went wrong when login!", error);
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LoginController();
