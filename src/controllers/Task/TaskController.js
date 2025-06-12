const TaskService = require("./TaskServices.js");

class TaskController {
  async newTask(req, res) {
    try {
      const { name, description, status, start, deadline } = req.body;
      await TaskService.createTask({
        name,
        description,
        status,
        start,
        deadline,
      });
      return res.status(201).json({ message: "Task created successfully!" });
    } catch (err) {
      console.error("Error creating task:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async listAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      if (tasks.length === 0) {
        return res.status(404).json({ error: "There are no tasks!" });
      }
      return res.status(200).json(tasks);
    } catch (err) {
      console.error("Error listing tasks:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async listTask(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ error: "Task not found!" });
      }
      return res.status(200).json(task);
    } catch (err) {
      console.error("Error fetching task:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { name, description, status, start, deadline } = req.body;

      const updateData = {};
      if (name) updateData.name_task = name;
      if (description) updateData.description_task = description;
      if (status) updateData.status_task = status;
      if (start) updateData.start_task = start;
      if (deadline) updateData.deadline_task = deadline;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No data to update!" });
      }

      const updated = await TaskService.updateTask(id, updateData);
      if (!updated) {
        return res.status(404).json({ error: "Task not found!" });
      }
      return res.status(200).json({ message: "Task updated successfully!" });
    } catch (err) {
      console.error("Error updating task:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deleted = await TaskService.deleteTask(id);
      if (!deleted) {
        return res.status(404).json({ error: "Task not found!" });
      }
      return res.status(200).json({ message: "Task deleted successfully!" });
    } catch (err) {
      console.error("Error deleting task:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async assignTaskToTeam(req, res) {
    try {
      const { team, task } = req.params;
      const result = await TaskService.assignTaskToTeam(team, task);

      if (result.error === "TEAM_NOT_FOUND") {
        return res.status(404).json({ error: "Team not found!" });
      }
      if (result.error === "TASK_NOT_FOUND") {
        return res.status(404).json({ error: "Task not found!" });
      }

      return res
        .status(201)
        .json({ message: "Task assigned to team successfully!" });
    } catch (err) {
      console.error("Error assigning task to team:", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TaskController();
