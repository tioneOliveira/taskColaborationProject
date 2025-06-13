// services/AuthService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../../model/UserRepository");

const { JWT_SECRET_KEY } = process.env;

class AuthService {
  async authenticate(email, password) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) return { error: "USER_NOT_FOUND" };

    const validPassword = await bcrypt.compare(password, user.password_user);
    if (!validPassword) return { error: "INVALID_PASSWORD" };

    const token = jwt.sign(
      {
        id: user.id_user,
        team: user.id_team_user,
        permission: user.permission_user,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return { token, user };
  }
}

module.exports = new AuthService();
