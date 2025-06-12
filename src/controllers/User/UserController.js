// controllers/UserController.js
const UserService = require("./UserServices");

class UserController {
  async newUser(req, res) {
    try {
      const result = await UserService.createUser(req.body);

      if (result.error === "EMAIL_IN_USE") {
        return res.status(409).json({ error: "E-mail already in use!" });
      }
      return res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async listAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      if (users.length === 0) {
        return res.status(404).json({ error: "There are no users!" });
      }
      return res.status(200).json(users);
    } catch (err) {
      console.error("Error listing users:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async listUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, role, email, password, permission } = req.body;

      const updateData = {};
      if (name) updateData.name_user = name;
      if (role) updateData.role_user = role;
      if (email) updateData.email_user = email;
      if (password) updateData.password = password; // será hash no service
      if (permission) updateData.permission_user = permission;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No data to update!" });
      }

      const updated = await UserService.updateUser(id, updateData);
      if (!updated) {
        return res.status(404).json({ error: "User not found!" });
      }
      return res.status(200).json({ message: "User updated successfully!" });
    } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await UserService.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ error: "User not found!" });
      }
      return res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  /* ---------- relações ---------- */
  async assignUserToTeam(req, res) {
    try {
      const { team, user } = req.params;
      const result = await UserService.assignUserToTeam(team, user);

      if (result.error === "TEAM_NOT_FOUND") {
        return res.status(404).json({ error: "Team not found!" });
      }
      if (result.error === "USER_NOT_FOUND") {
        return res.status(404).json({ error: "User not found!" });
      }
      return res
        .status(201)
        .json({ message: "User assigned to team successfully!" });
    } catch (err) {
      console.error("Error assigning user to team:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async assignUserWithTask(req, res) {
    try {
      const { user, task } = req.params;
      const result = await UserService.assignUserWithTask(user, task);

      if (result.error === "USER_NOT_FOUND") {
        return res.status(404).json({ error: "User not found!" });
      }
      if (result.error === "TASK_NOT_FOUND") {
        return res.status(404).json({ error: "Task not found!" });
      }
      if (result.error === "DIFFERENT_TEAMS") {
        return res.status(409).json({
          error: "User and task do not belong to the same team!",
        });
      }
      return res
        .status(201)
        .json({ message: "User assigned to task successfully!" });
    } catch (err) {
      console.error("Error assigning user to task:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async listTasksAssignedToUser(req, res) {
    try {
      const { id } = req.params;
      const tasks = await UserService.listTasksAssignedToUser(id);

      if (tasks.length === 0) {
        return res
          .status(404)
          .json({ error: "There are no tasks assigned to this user!" });
      }
      return res.status(200).json(tasks);
    } catch (err) {
      console.error("Error listing tasks for user:", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
