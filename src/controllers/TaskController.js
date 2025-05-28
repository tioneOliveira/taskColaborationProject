const database = require("../database/connection");

class TaskController {
  async newTask(request, response) {
    const { name, description, status, start, deadline } = await request.body;

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
        .select("*")
        .table("Task")
        .where({ deleted_at: null })
        .then((tasks) => {
          console.log(tasks);
          response.status(200).json(tasks);
        });
    } catch (error) {
      console.log("Something went wrong when listing all tasks!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async updateTask(request, response) {
    const { id } = await request.params;
    const { name, description, status, start, deadline } = await request.body;

    const updatedTask = {};
    if (name) updatedTask.name_task = name;
    if (description) updatedTask.description_task = description;
    if (status) updatedTask.status_task = status;
    if (start) updatedTask.start_task = start;
    if (deadline) updatedTask.deadline_task = deadline;
    if (Object.keys(updatedTask).length === 0) {
      return response.status(400).json({ error: "No data to update!" });
    }
    try {
      await database
        .table("Task")
        .where({ id_task: id })
        .update(updatedTask)
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
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
    const { id } = await request.params;
    try {
      await database
        .table("Task")
        .where({ id_task: task - id, deleted_at: null })
        .update({ deleted_at: database.fn.now() })
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
            return response.status(404).json({ error: "Task not found!" });
          }
          response.status(200).json({ message: "Task deleted successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong at deleting the task!", error);
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();
