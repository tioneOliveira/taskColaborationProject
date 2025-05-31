const database = require("../database/connection");
const bcrypt = require("bcrypt");

class UserController {
  async newUser(request, response) {
    try {
      const { name, email, password, role, permission } = request.body;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const insertedUser = await database
        .insert({
          name_user: name,
          email_user: email,
          password_user: hashPassword,
          role_user: role,
          permission_user: permission,
        })
        .table("User");

      console.log(insertedUser);
      return response
        .status(201)
        .json({ message: "User created successfuly!" });
    } catch (error) {
      console.log("Something went wrong when creating a new user!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listAllUsers(request, response) {
    try {
      const user = await database
        .table("User")
        .where({ deleted_at_user: null });

      if (user.length === 0) {
        return response.status(404).json({ error: "There are no users!" });
      }

      console.log(user);
      return response.status(200).json(user);
    } catch (error) {
      console.log("Something went wrong when listing all users!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listUser(request, response) {
    try {
      const { id } = request.params;

      const user = await database
        .table("User")
        .where({ id_user: id, deleted_at_user: null })
        .first();

      if (!user) {
        return response.status(404).json({ error: "User not found!" });
      }

      console.log(user);
      response.status(200).json(user);
    } catch (error) {
      console.log("Something went wrong when listing the user!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async updateUser(request, response) {
    try {
      const { id } = request.params;
      const { name, role, email, password, permission } = request.body;

      const updateUser = {};

      if (name) updateUser.name_user = name;
      if (role) updateUser.role_user = role;
      if (email) updateUser.email_user = email;
      if (password) updateUser.password_user = password;
      if (permission) updateUser.permission_user = permission;
      if (Object.keys(updateUser).length === 0) {
        return response.status(400).json({ error: "No data to update!" });
      }

      const updatedUser = await database
        .table("User")
        .where({ id_user: id, deleted_at_user: null })
        .update(updateUser);

      if (!updatedUser) {
        return response.status(404).json({ error: "User not found!" });
      }
      return response
        .status(200)
        .json({ message: "User updated successfuly!" });
    } catch (error) {
      console.log("Something went wrong when updating user!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async deleteUser(request, response) {
    try {
      const { id } = request.params;

      const deletedUser = await database
        .table("User")
        .where({ id_user: id, deleted_at_user: null })
        .update({ deleted_at_user: database.fn.now() });

      if (!deletedUser) {
        return response.status(404).json({ error: "User not found!" });
      }

      return response
        .status(200)
        .json({ message: "User deleted successfuly!" });
    } catch (error) {
      console.log("Something went wrong when deleting user!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async assignUserToTeam(resquest, response) {
    try {
      const { team, user } = resquest.params;

      const teamExists = await database
        .table("Team")
        .where({ id_team: team, deleted_at_team: null })
        .first();

      if (!teamExists) {
        return response.status(404).json({ error: "Team not found!" });
      }

      const userExists = await database
        .table("User")
        .where({ id_user: user, deleted_at_user: null })
        .first();

      if (!userExists) {
        return response.status(404).json({ error: "User not found!" });
      }

      const userAssignedToTeam = await database
        .table("User")
        .where({ id_user: user })
        .update({ id_team_user: team });

      console.log(userAssignedToTeam);
      return response
        .status(201)
        .json({ message: "User assigned to team successfuly!" });
    } catch (error) {
      console.log(
        "Something went wrong when assigning a user to a team!",
        error
      );
      return response.status(500).json({ error: error.message });
    }
  }

  async assignUserWithTask(request, response) {
    try {
      const { user, task } = request.params;

      const userExists = await database
        .table("User")
        .where({ id_user: user, deleted_at_user: null })
        .first();

      if (!userExists) {
        return response.status(404).json({ error: "User not found!" });
      }

      const taskExists = await database
        .table("Task")
        .where({ id_task: task, deleted_at_task: null })
        .first();

      if (!taskExists) {
        return response.status(404).json({ error: "Task not found!" });
      }

      const userTaskBelongsTeam = await database
        .select("id_user")
        .table("User")
        .join("Task", "User.id_team_user", "Task.id_team_task")
        .where({ "User.id_user": user, "Task.id_task": task })
        .first();

      if (!userTaskBelongsTeam) {
        return response.status(404).json({
          error: "User and/or task doesn't belongs to the same team!",
        });
      }

      const taskAssignedToUser = await database
        .insert({ id_user: user, id_task: task })
        .into("User_Task");

      console.log(taskAssignedToUser);
      return response
        .status(201)
        .json({ message: "User successfully assigned to do task" });
    } catch (error) {
      console.log("Something went wrong when assigning user with task!", error);
      return response.status(500).json({ error: error.message });
    }
  }

  async listTasksAssignedToUser(request, response) {
    try {
      const { id } = request.params;

      const tasksAssignedToUser = await database
        .table("Task")
        .join("User_Task", "Task.id_task", "User_Task.id_Task")
        .where({ "User_Task.id_user": id });

      if (tasksAssignedToUser.length === 0) {
        return response
          .status(404)
          .json({ error: "There are no tasks assigned to this user" });
      }

      console.log(tasksAssignedToUser);
      return response.status(500).json(tasksAssignedToUser);
    } catch (error) {
      console.log(
        "Something went wrong when listing the tasks assigned to this user!",
        error
      );
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
