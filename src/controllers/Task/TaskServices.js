// services/TaskService.js
const TaskRepository = require("../../model/TaskRepository");
const TeamRepository = require("../../model/TeamRepository");

class TaskService {
  async createTask(data) {
    await TaskRepository.createTask(data);
  }

  async getAllTasks() {
    return TaskRepository.findAllTasks();
  }

  async getTaskById(id) {
    return TaskRepository.findTaskById(id);
  }

  async updateTask(id, data) {
    return TaskRepository.updateTask(id, data);
  }

  async deleteTask(id) {
    return TaskRepository.softDeleteTask(id);
  }

  async assignTaskToTeam(teamId, taskId) {
    const team = await TeamRepository.findTeamById(teamId);
    if (!team) return { error: "TEAM_NOT_FOUND" };

    const task = await TaskRepository.findTaskById(taskId);
    if (!task) return { error: "TASK_NOT_FOUND" };

    await TaskRepository.assignTaskToTeam(taskId, teamId);
    return { success: true };
  }
}

module.exports = new TaskService();
