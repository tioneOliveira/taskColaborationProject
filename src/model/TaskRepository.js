const db = require("../database/connection");

class TaskRepository {
  async createTask(data) {
    return db("Task").insert({
      name_task: data.name,
      description_task: data.description,
      status_task: data.status,
      start_task: data.start,
      deadline_task: data.deadline,
    });
  }

  async findAllTasks() {
    return db("Task").where({ deleted_at_task: null });
  }

  async findTaskById(id) {
    return db("Task").where({ id_task: id, deleted_at_task: null }).first();
  }

  async updateTask(id, data) {
    return db("Task")
      .where({ id_task: id, deleted_at_task: null })
      .update(data);
  }

  async softDeleteTask(id) {
    return db("Task")
      .where({ id_task: id, deleted_at_task: null })
      .update({ deleted_at_task: db.fn.now() });
  }

  async assignTaskToTeam(taskId, teamId) {
    return db("Task")
      .where({ id_task: taskId, deleted_at_task: null })
      .update({ id_team_task: teamId });
  }
}

module.exports = new TaskRepository();
