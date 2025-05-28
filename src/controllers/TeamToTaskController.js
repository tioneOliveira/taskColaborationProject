const database = require("../database/connection");

class TeamToTaskController {
  async assignTasksToTeamController(resquest, response) {
    const { team, task } = await resquest.params;

    try {
      await database
        .table("Team")
        .where({ id_team: team })
        .then((rowsAffected) => {
          if (rowsAffected.length === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
        });

      await database
        .table("Task")
        .where({ id_task: task })
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
            return response.status(404).json({ error: "Task not found!" });
          }
        });

      await database
        .insert({ id_team: team, id_task: task })
        .table("Team_Task")
        .then((teamAssignedToTask) => {
          console.log(teamAssignedToTask);
          response
            .status(201)
            .json({ message: "Team assigned to task successfuly!" });
        });
    } catch (error) {
      console.log(
        "Something went wrong when assigning a team to a task!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }

  async listAllTeamsAssignedToTasks(request, response) {
    try {
      await database
        .select("*")
        .table("Team_Task")
        .then((teamsAssignedToTasks) => {
          console.log(teamsAssignedToTasks);
          response.status(200).json(teamsAssignedToTasks);
        });
    } catch (error) {
      console.log(
        "Something went wrong when listing assigned a teams to tasks!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }

  async listTeamsAssignedToATask(request, response) {
    const { id } = request.params;
    try {
      await database
        .select("*")
        .table("Team_Task")
        .where({ id_task: id })
        .then((teamsAssignedToATask) => {
          console.log(teamsAssignedToATask);
          response.status(200).json(teamsAssignedToATask);
        });
    } catch (error) {
      console.log(
        "Something went wrong when listing teams assigned to a task!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }

  async listTasksAssignedToATeam(request, response) {
    const { id } = await request.params;
    try {
      await database
        .select("*")
        .table("Team_Task")
        .where({ id_team: id })
        .then((tasksAssignedToATeam) => {
          console.log(tasksAssignedToATeam);
          response.status(200).json(tasksAssignedToATeam);
        });
    } catch (error) {
      console.log(
        "Something went wrong when listing tasks assigned to a team!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TeamToTaskController();
