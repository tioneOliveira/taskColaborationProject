const database = require("../database/connection");

class TeamController {
  async newTeam(request, response) {
    try {
      const { name } = request.body;

      const insertedTeam = await database
        .insert({ name_team: name })
        .table("Team");

      console.log(insertedTeam);
      return response
        .status(201)
        .json({ message: "Team created successfuly!" });
    } catch (error) {
      console.log("Something went wrong at creating a new team!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listAllTeams(request, response) {
    try {
      const teams = await database
        .table("Team")
        .where({ deleted_at_team: null });

      if (teams.length === 0) {
        return response.status(404).json({ error: "There are no teams!" });
      }

      console.log(teams);
      return response.status(200).json(teams);
    } catch (error) {
      console.log("Something went wrong when listing all the teams!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listTeam(request, response) {
    try {
      const { id } = request.params;

      const team = await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .first();

      if (!team) {
        return response.status(404).json({ error: "Team not found!" });
      }

      console.log(team);
      return response.status(200).json(team);
    } catch (error) {
      console.log("Something went wrong when listing the team!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async updateTeam(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      const updateTeam = {};

      if (name) updateTeam.name_team = name;

      if (Object.keys(updateTeam).length === 0) {
        return response.status(400).json({ error: "No data to update!" });
      }

      const updatedTeam = await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .update(updateTeam);

      if (!updatedTeam) {
        return response.status(404).json({ error: "Team not found!" });
      }

      return response
        .status(200)
        .json({ message: "Team updated successfuly!" });
    } catch (error) {
      console.log("Something went wrong when updating the team!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async deleteTeam(request, response) {
    try {
      const { id } = request.params;

      const deletedTeam = await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .update({ deleted_at_team: database.fn.now() });

      if (!deletedTeam) {
        return response.status(404).json({ error: "Team not found!" });
      }

      return response
        .status(200)
        .json({ message: "Team deleted successfuly!" });
    } catch (error) {
      console.log("Something went wrong when deleting the team!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listUsersInTeam(request, response) {
    try {
      const { id } = request.params;

      const team = await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .first();

      if (!team) {
        return response.status(404).json({ error: "Team not found!" });
      }

      const usersInTeam = await database
        .table("User")
        .where({ id_team_user: id, deleted_at_user: null });

      if (usersInTeam.length === 0) {
        return response
          .status(404)
          .json({ error: "There are no users in the team!" });
      }

      console.log(usersInTeam);
      return response.status(200).json(usersInTeam);
    } catch (error) {
      console.log(
        "Something went wrong when listing the users in the team!",
        error
      );
      return response.status(500).json({ error: error.message });
    }
  }

  async listTasksInTeam(request, response) {
    try {
      const { id } = request.params;

      const team = await database
        .table("Team")
        .where({ id_team: id, deleted_at_team: null })
        .first();

      if (!team) {
        return response.status(404).json({ error: "Team not found!" });
      }

      const tasksInTeam = await database
        .table("Task")
        .where({ id_team_task: id, deleted_at_task: null });

      if (tasksInTeam.length === 0) {
        return response
          .status(404)
          .json({ error: "There are no tasks in the team!" });
      }

      console.log(tasksInTeam);
      return response.status(200).json(tasksInTeam);
    } catch (error) {
      console.log(
        "Something went wrong when listing the tasks in the team!",
        error
      );
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TeamController();
