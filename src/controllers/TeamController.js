const database = require("../database/connection");

class TeamController {
  async newTeam(request, response) {
    const { name } = request.body;

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
        .table("Team")
        .where({ deleted_at_team: null })
        .then((teams) => {
          if (teams.length === 0) {
            return response.status(404).json({ error: "There are no teams!" });
          }
          console.log(teams);
          response.status(200).json(teams);
        });
    } catch (error) {
      console.log("Something went wrong when listing all the teams!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listTeam(request, response) {
    const { id } = request.params;
    try {
      await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .then((team) => {
          if (team.length === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
          console.log(team);
          response.status(200).json(team);
        });
    } catch (error) {
      console.log("Something went wrong when listing the team!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async updateTeam(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const updateTeam = {};
    if (name) updateTeam.name_team = name;
    if (Object.keys(updateTeam).length === 0) {
      return response.status(400).json({ error: "No data to update!" });
    }

    try {
      await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .update(updateTeam)
        .then((updatedTeam) => {
          if (updatedTeam === 0) {
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
    const { id } = request.params;

    try {
      await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .update({ deleted_at_team: database.fn.now() })
        .then((deletedTeam) => {
          if (deletedTeam === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
          response.status(200).json({ message: "Team deleted successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong when deleting the team!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listUsersInTeam(request, response) {
    const { id } = request.params;
    try {
      await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .then((team) => {
          if (team.length === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
        });

      await database
        .table("User")
        .where({ id_team_user: id, deleted_at_user: null })
        .then((usersInTeam) => {
          if (usersInTeam.length === 0) {
            return response
              .status(404)
              .json({ error: "There are no users in the team!" });
          }
          console.log(usersInTeam);
          response.status(200).json(usersInTeam);
        });
    } catch (error) {
      console.log(
        "Something went wrong when listing the users in the team!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }

  async listTasksInTeam(request, response) {
    const { id } = request.params;
    try {
      await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .then((team) => {
          if (team.length === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
        });

      await database
        .table("Task")
        .where({ id_team_task: id, deleted_at_task: null })
        .then((tasksInTeam) => {
          if (tasksInTeam.length === 0) {
            return response
              .status(404)
              .json({ error: "There are no tasks in the team!" });
          }
          console.log(tasksInTeam);
          response.status(200).json(tasksInTeam);
        });
    } catch (error) {
      console.log(
        "Something went wrong when listing the tasks in the team!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TeamController();
