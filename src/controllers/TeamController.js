const database = require("../database/connection");

class TeamController {
  async newTeam(request, response) {
    const { name } = await request.body;

    try {
      await database
        .insert({ name_team: name })
        .table("Team")
        .then((team) => {
          console.log(team);
          response.status(201).json({ message: "Team created successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong at creating a new team!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listAllTeams(request, response) {
    try {
      await database
        .select("*")
        .table("Team")
        .where({ deleted_at: null })
        .then((teams) => {
          console.log(teams);
          response.status(200).json(teams);
        });
    } catch (error) {
      console.log("Something went wrong when listing all the teams!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listTeam(request, response) {
    const { id } = await request.params;
    try {
      await database
        .select("*")
        .table("Team")
        .where({ id_team: id })
        .then((team) => {
          console.log(team);
          response.status(200).json(team);
        });
    } catch (error) {
      console.log("Something went wrong when listing the team!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async updateTeam(request, response) {
    const { id } = await request.params;
    const { name } = await request.body;

    const updatedTeam = {};
    if (name) updatedTeam.name_team = name;
    if (Object.keys(updatedTeam).length === 0) {
      return response.status(400).json({ error: "No data to update!" });
    }

    try {
      await database
        .table("Team")
        .where({ id_team: id })
        .update(updatedTeam)
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
          response.status(200).json({ message: "Team updated successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong when updating the team!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async deleteTeam(request, response) {
    const { id } = await request.params;

    try {
      await database
        .table("Team")
        .where({ id_team: id, deleted_at: null })
        .update({ deleted_at: database.fn.now() })
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
          response.status(200).json({ message: "Team deleted successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong when deleting the team!", error);
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TeamController();
