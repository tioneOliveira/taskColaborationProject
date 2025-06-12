// repositories/UserRepository.js
const db = require("../database/connection");

class UserRepository {
  async createUser(data) {
    return db("User").insert({
      name_user: data.name,
      email_user: data.email,
      password_user: data.passwordHash,
      role_user: data.role,
      permission_user: data.permission,
    });
  }

  async findAllUsers() {
    return db("User").where({ deleted_at_user: null });
  }

  async findUserById(id) {
    return db("User").where({ id_user: id, deleted_at_user: null }).first();
  }

  async findUserByEmail(email) {
    return db("User")
      .where({ email_user: email, deleted_at_user: null })
      .first();
  }

  async updateUser(id, data) {
    return db("User")
      .where({ id_user: id, deleted_at_user: null })
      .update(data);
  }

  async softDeleteUser(id) {
    return db("User")
      .where({ id_user: id, deleted_at_user: null })
      .update({ deleted_at_user: db.fn.now() });
  }

  async assignUserToTeam(userId, teamId) {
    return db("User")
      .where({ id_user: userId, deleted_at_user: null })
      .update({ id_team_user: teamId });
  }

  async linkUserTask(userId, taskId) {
    return db("User_Task").insert({ id_user: userId, id_task: taskId });
  }

  async findCommonTeam(userId, taskId) {
    return db("User")
      .select("User.id_user")
      .join("Task", "User.id_team_user", "Task.id_team_task")
      .where({
        "User.id_user": userId,
        "Task.id_task": taskId,
        "User.deleted_at_user": null,
        "Task.deleted_at_task": null,
      })
      .first();
  }

  async listTasksAssignedToUser(userId) {
    return db("Task")
      .join("User_Task", "Task.id_task", "User_Task.id_task")
      .where({ "User_Task.id_user": userId, "Task.deleted_at_task": null });
  }
}

module.exports = new UserRepository();
