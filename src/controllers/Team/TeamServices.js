const TeamRepository = require("../../model/TeamRepository.js");

class TeamService {
  async createTeam(name) {
    await TeamRepository.createTeam(name);
  }

  async getAllTeams() {
    return await TeamRepository.findAllTeams();
  }

  async getTeamById(id) {
    return await TeamRepository.findTeamById(id);
  }

  async updateTeam(id, data) {
    return await TeamRepository.updateTeam(id, data);
  }

  async deleteTeam(id) {
    return await TeamRepository.softDeleteTeam(id);
  }

  async getUsersInTeam(id) {
    const team = await TeamRepository.findTeamById(id);
    if (!team) return null;
    return await TeamRepository.findUsersInTeam(id);
  }

  async getTasksInTeam(id) {
    const team = await TeamRepository.findTeamById(id);
    if (!team) return null;
    return await TeamRepository.findTasksInTeam(id);
  }
}

module.exports = new TeamService();
