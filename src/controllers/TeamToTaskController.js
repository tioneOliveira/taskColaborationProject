const database = require("../database/connection");

class TeamToTaskController {
  async assignTasksToTeamController(resquest, response) {
    const { team, task } = resquest.params;

    try {
      await database
        .table("Team")
        .where({ id_team: team, deleted_at_team: null })
        .then((rowsAffected) => {
          if (rowsAffected.length === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
        });

      await database
        .table("Task")
        .where({ id_task: task, deleted_at_task: null })
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
        .from("Team")
        .innerJoin("Team_Task", "Team.id_team", "Team_Task.id_team")
        .innerJoin("Task", "Task.id_task", "Team_Task.id_task")
        .where({ "Task.deleted_at_task": null, "Team.deleted_at_team": null })
        .then((teamsAssignedToTasks) => {
          if (teamsAssignedToTasks === 0) {
            return response
              .status(404)
              .json({ error: "There are no teams assigned to tasks!" });
          }
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
        .table("Team")
        .innerJoin("Team_Task", "Team.id_team", "Team_Task.id_team")
        .where({ "Team_Task.id_task": id, "Team.deleted_at_team": null })
        .then((teamsAssignedToATask) => {
          if (teamsAssignedToATask === 0) {
            return response
              .status(404)
              .json({ error: "There are no teams assigned to this task!" });
          }
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
    const { id } = request.params;
    try {
      await database
        .table("Task")
        .innerJoin("Team_Task", "Task.id_task", "Team_Task.id_task")
        .where({ "Team_Task.id_team": id, "Task.deleted_at_task": null })
        .then((tasksAssignedToATeam) => {
          if (tasksAssignedToATeam === 0) {
            return response
              .status(404)
              .json({ error: "There are no tasks assigned to this team!" });
          }
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

  async listTaskAssignedToATeam(request, response) {
    const { team, task } = request.params;

    try {
      await database
        .table("Team")
        .where({ id_team: team, deleted_at_team: null })
        .then((team) => {
          if (team.length === 0) {
            return response.status(404).json({ error: "Team not found!" });
          }
        });

      await database
        .table("Task")
        .where({ id_task: task, deleted_at_task: null })
        .then((task) => {
          if (task.length === 0) {
            return response.status(404).json({ error: "Task not found!" });
          }
        });

      await database
        .table("Team")
        .innerJoin("Team_Task", "Team.id_team", "Team_Task.id_team")
        .innerJoin("Task", "Task.id_task", "Team_Task.id_task")
        .where({
          "Task.deleted_at_task": null,
          "Team.deleted_at_team": null,
          "Team_Task.id_task": task,
          "Team_Task.id_team": team,
        })
        .then((teamsAssignedToTask) => {
          if (teamsAssignedToTask.length === 0) {
            return response
              .status(404)
              .json({ error: "This relation doesn't exists!" });
          }
          console.log(teamsAssignedToTask);
          response.status(200).json(teamsAssignedToTask);
        });
    } catch (error) {
      console.log(
        "Something went wrong when listing the assignment of a team to a tasks!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TeamToTaskController();
