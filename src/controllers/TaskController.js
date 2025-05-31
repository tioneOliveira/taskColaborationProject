const database = require("../database/connection");

class TaskController {
  async newTask(request, response) {
    try {
      const { name, description, status, start, deadline } = request.body;

      const insertedTask = await database
        .insert({
          name_task: name,
          description_task: description,
          status_task: status,
          start_task: start,
          deadline_task: deadline,
        })
        .table("Task");

      console.log(insertedTask);
      return response
        .status(201)
        .json({ message: "Task created successfuly!" });
    } catch (error) {
      console.log("Something went wrong at creating a new task!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listAllTasks(request, response) {
    try {
      const tasks = await database
        .table("Task")
        .where({ deleted_at_task: null });

      if (tasks.length === 0) {
        return response.status(404).json({ error: "There are no tasks!" });
      }

      console.log(tasks);
      return response.status(200).json(tasks);
    } catch (error) {
      console.log("Something went wrong when listing all tasks!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listTask(request, response) {
    try {
      const { id } = request.params;

      const task = await database
        .table("Task")
        .where({ id_task: id, deleted_at_task: null })
        .first();

      if (!task) {
        return response.status(404).json({ error: "Task not found!" });
      }

      console.log(task);
      return response.status(200).json(task);
    } catch (error) {
      console.log("Something went wrong when listing the task!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async updateTask(request, response) {
    try {
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

      const updatedTask = await database
        .table("Task")
        .where({ id_task: id, deleted_at_task: null })
        .update(updateTask);

      if (!updatedTask) {
        return response.status(404).json({ error: "Task not found!" });
      }
      return response
        .status(200)
        .json({ message: "Task updated successfuly!" });
    } catch (error) {
      console.log("Something went wrong when updating the task!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async deleteTask(request, response) {
    try {
      const { id } = request.params;

      const deletedTask = await database
        .table("Task")
        .where({ id_task: id, deleted_at_task: null })
        .update({ deleted_at_task: database.fn.now() });

      if (!deletedTask) {
        return response.status(404).json({ error: "Task not found!" });
      }

      return response
        .status(200)
        .json({ message: "Task deleted successfuly!" });
    } catch (error) {
      console.log("Something went wrong at deleting the task!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async assignTaskToTeam(resquest, response) {
    try {
      const { team, task } = resquest.params;

      const teamExists = await database
        .table("Team")
        .where({ id_team: team, deleted_at_team: null })
        .first();

      if (!teamExists) {
        return response.status(404).json({ error: "Team not found!" });
      }

      const taskExists = await database
        .table("Task")
        .where({ id_task: task, deleted_at_task: null })
        .first();

      if (!taskExists) {
        return response.status(404).json({ error: "Task not found!" });
      }

      const taskAssignedToTeam = await database
        .table("Task")
        .where({ id_task: task })
        .update({ id_team_task: team });

      console.log(taskAssignedToTeam);
      return response
        .status(201)
        .json({ message: "Task assigned to team successfuly!" });
    } catch (error) {
      console.log(
        "Something went wrong when assigning a task to a team!",
        error
      );
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();
