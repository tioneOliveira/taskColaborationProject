const db = require("../database/connection");

class TeamRepository {
  async createTeam(name) {
    return await db("Team").insert({ name_team: name });
  }

  async findAllTeams() {
    return await db("Team").where({ deleted_at_team: null });
  }

  async findTeamById(id) {
    return await db("Team")
      .where({ id_team: id, deleted_at_team: null })
      .first();
  }

  async updateTeam(id, data) {
    return await db("Team")
      .where({ id_team: id, deleted_at_team: null })
      .update(data);
  }

  async softDeleteTeam(id) {
    return await db("Team")
      .where({ id_team: id, deleted_at_team: null })
      .update({ deleted_at_team: db.fn.now() });
  }

  async findUsersInTeam(id) {
    return await db("User").where({ id_team_user: id, deleted_at_user: null });
  }

  async findTasksInTeam(id) {
    return await db("Task").where({ id_team_task: id, deleted_at_task: null });
  }
}

module.exports = new TeamRepository();
