const bcrypt = require("bcrypt");
const UserRepository = require("../../model/UserRepository");
const TeamRepository = require("../../model/TeamRepository");
const TaskRepository = require("../../model/TaskRepository");

class UserService {
  async createUser({ name, email, password, role, permission }) {
    const emailExists = await UserRepository.findUserByEmail(email);
    if (emailExists) return { error: "EMAIL_IN_USE" };

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await UserRepository.createUser({
      name,
      email,
      role,
      permission,
      passwordHash,
    });
    return { success: true };
  }

  async getAllUsers() {
    return UserRepository.findAllUsers();
  }

  async getUserById(id) {
    return UserRepository.findUserById(id);
  }

  async updateUser(id, fields) {
    if (fields.password) {
      const salt = await bcrypt.genSalt(10);
      fields.password_user = await bcrypt.hash(fields.password, salt);
      delete fields.password;
    }
    return UserRepository.updateUser(id, fields);
  }

  async deleteUser(id) {
    return UserRepository.softDeleteUser(id);
  }

  async assignUserToTeam(teamId, userId) {
    const team = await TeamRepository.findTeamById(teamId);
    if (!team) return { error: "TEAM_NOT_FOUND" };

    const user = await UserRepository.findUserById(userId);
    if (!user) return { error: "USER_NOT_FOUND" };

    await UserRepository.assignUserToTeam(userId, teamId);
    return { success: true };
  }

  async assignUserWithTask(userId, taskId) {
    const user = await UserRepository.findUserById(userId);
    if (!user) return { error: "USER_NOT_FOUND" };

    const task = await TaskRepository.findTaskById(taskId);
    if (!task) return { error: "TASK_NOT_FOUND" };

    const sameTeam = await UserRepository.findCommonTeam(userId, taskId);
    if (!sameTeam) return { error: "DIFFERENT_TEAMS" };

    await UserRepository.linkUserTask(userId, taskId);
    return { success: true };
  }

  async listTasksAssignedToUser(userId) {
    return UserRepository.listTasksAssignedToUser(userId);
  }
}

module.exports = new UserService();
