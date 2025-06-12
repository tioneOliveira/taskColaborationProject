const TeamService = require("./TeamServices.js");

class TeamController {
  async newTeam(req, res) {
    try {
      const { name } = req.body;
      await TeamService.createTeam(name);
      return res.status(201).json({ message: "Team created successfully!" });
    } catch (error) {
      console.error("Error creating team:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async listAllTeams(req, res) {
    try {
      const teams = await TeamService.getAllTeams();
      if (teams.length === 0) {
        return res.status(404).json({ error: "There are no teams!" });
      }
      return res.status(200).json(teams);
    } catch (error) {
      console.error("Error listing teams:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async listTeam(req, res) {
    try {
      const { id } = req.params;
      const team = await TeamService.getTeamById(id);
      if (!team) {
        return res.status(404).json({ error: "Team not found!" });
      }
      return res.status(200).json(team);
    } catch (error) {
      console.error("Error listing team:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async updateTeam(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateData = {};
      if (name) updateData.name_team = name;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No data to update!" });
      }

      const updated = await TeamService.updateTeam(id, updateData);
      if (!updated) {
        return res.status(404).json({ error: "Team not found!" });
      }

      return res.status(200).json({ message: "Team updated successfully!" });
    } catch (error) {
      console.error("Error updating team:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteTeam(req, res) {
    try {
      const { id } = req.params;
      const deleted = await TeamService.deleteTeam(id);
      if (!deleted) {
        return res.status(404).json({ error: "Team not found!" });
      }
      return res.status(200).json({ message: "Team deleted successfully!" });
    } catch (error) {
      console.error("Error deleting team:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async listUsersInTeam(req, res) {
    try {
      const { id } = req.params;
      const users = await TeamService.getUsersInTeam(id);
      if (users === null) {
        return res.status(404).json({ error: "Team not found!" });
      }
      if (users.length === 0) {
        return res
          .status(404)
          .json({ error: "There are no users in the team!" });
      }
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error listing users in team:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async listTasksInTeam(req, res) {
    try {
      const { id } = req.params;
      const tasks = await TeamService.getTasksInTeam(id);
      if (tasks === null) {
        return res.status(404).json({ error: "Team not found!" });
      }
      if (tasks.length === 0) {
        return res
          .status(404)
          .json({ error: "There are no tasks in the team!" });
      }
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error listing tasks in team:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TeamController();
