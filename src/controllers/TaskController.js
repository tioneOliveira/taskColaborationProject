const database = require("../database/connection");

class TaskController {
  async newTask(request, response) {
    const { name, description, status, start, deadline } = request.body;

    try {
      await database
        .insert({
          name_task: name,
          description_task: description,
          status_task: status,
          start_task: start,
          deadline_task: deadline,
        })
        .table("Task")
        .then((task) => {
          console.log(task);
          response.status(201).json({ message: "Task created successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong at creating a new task!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listAllTasks(request, response) {
    try {
      await database
        .table("Task")
        .where({ deleted_at_task: null })
        .then((tasks) => {
          if (tasks.length === 0) {
            return response.status(404).json({ error: "There are no tasks!" });
          }
          console.log(tasks);
          response.status(200).json(tasks);
        });
    } catch (error) {
      console.log("Something went wrong when listing all tasks!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listTask(request, response) {
    const { id } = request.params;
    try {
      await database
        .table("Task")
        .where({ id_task: id, deleted_at_task: null })
        .then((task) => {
          if (task.length === 0) {
            return response.status(404).json({ error: "Task not found!" });
          }
          console.log(task);
          response.status(200).json(task);
        });
    } catch (error) {
      console.log("Something went wrong when listing the task!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async updateTask(request, response) {
    const { id } = request.params;
    const { name, description, status, start, deadline } = request.body;

    const updateTask = {};
    if (name) updateTask.name_task = name;
    if (description) updateTask.description_task = description;
    if (status) updateTask.status_task = status;
    if (start) updateTask.start_task = start;
    if (deadline) updateTask.deadline_task = deadline;
    if (Object.keys(updateTask).length === 0) {
      return response.status(400).json({ error: "No data to update!" });
    }
    try {
      await database
        .table("Task")
        .where({ id_task: id, deleted_at_task: null })
        .update(updateTask)
        .then((updatedTask) => {
          if (updatedTask === 0) {
            return response.status(404).json({ error: "Task not found!" });
          }
          response.status(200).json({ message: "Task updated successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong when updating the task!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async deleteTask(request, response) {
    const { id } = request.params;
    try {
      await database
        .table("Task")
        .where({ id_task: id, deleted_at_task: null })
        .update({ deleted_at_task: database.fn.now() })
        .then((deletedTask) => {
          if (deletedTask === 0) {
            return response.status(404).json({ error: "Task not found!" });
          }
          response.status(200).json({ message: "Task deleted successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong at deleting the task!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async assignTaskToTeam(resquest, response) {
    const { team, task } = resquest.params;

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
        .table("Task")
        .where({ id_task: task })
        .update({ id_team_task: team })
        .then((taskAssignedToTeam) => {
          console.log(taskAssignedToTeam);
          response
            .status(201)
            .json({ message: "Task assigned to team successfuly!" });
        });
    } catch (error) {
      console.log(
        "Something went wrong when assigning a task to a team!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();
