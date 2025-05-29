const database = require("../database/connection");

class UserController {
  async newUser(request, response) {
    try {
      const { name, email, password, role } = request.body;
      await database
        .insert({
          name_user: name,
          email_user: email,
          password_user: password,
          role_user: role,
        })
        .table("User")
        .then((user) => {
          console.log(user);
          response.status(201).json({ message: "User created successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong when creating a new user!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listAllUsers(request, response) {
    try {
      await database
        .table("User")
        .where({ deleted_at_user: null })
        .then((user) => {
          if (user.length === 0) {
            return response.status(404).json({ error: "There are no users!" });
          }
          console.log(user);
          response.status(200).json(user);
        });
    } catch (error) {
      console.log("Something went wrong when listing all users!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listUser(request, response) {
    const { id } = request.params;
    try {
      await database
        .table("User")
        .where({ id_user: id, deleted_at_user: null })
        .then((user) => {
          if (user.length === 0) {
            return response.status(404).json({ error: "User not found!" });
          }
          console.log(user);
          response.status(200).json(user);
        });
    } catch (error) {
      console.log("Something went wrong when listing the user!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async updateUser(request, response) {
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

    try {
      await database
        .table("User")
        .where({ id_user: id, deleted_at_user: null })
        .update(updateUser)
        .then((updatedUser) => {
          if (updatedUser === 0) {
            return response.status(404).json({ error: "User not found!" });
          }
          response.status(200).json({ message: "User updated successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong when updating user!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async deleteUser(request, response) {
    const { id } = request.params;

    try {
      await database
        .table("User")
        .where({ id_user: id, deleted_at_user: null })
        .update({ deleted_at_user: database.fn.now() })
        .then((deletedUser) => {
          if (deletedUser === 0) {
            return response.status(404).json({ error: "User not found!" });
          }
          response.status(200).json({ message: "User deleted successfuly!" });
        });
    } catch (error) {
      console.log("Something went wrong when deleting user!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async assignUserToTeam(resquest, response) {
    const { team, user } = resquest.params;

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
        .table("User")
        .where({ id_user: user, deleted_at_user: null })
        .then((user) => {
          if (user.length === 0) {
            return response.status(404).json({ error: "User not found!" });
          }
        });

      await database
        .table("User")
        .where({ id_user: user })
        .update({ id_team_user: team })
        .then((userAssignedToTeam) => {
          console.log(userAssignedToTeam);
          response
            .status(201)
            .json({ message: "User assigned to team successfuly!" });
        });
    } catch (error) {
      console.log(
        "Something went wrong when assigning a user to a team!",
        error
      );
      response.status(500).json({ error: error.message });
    }
  }

  async assignUserWithTask(request, response) {
    const { user, task } = request.params;
    try {
      await database
        .table("User")
        .where({ id_user: user, deleted_at_user: null })
        .then((user) => {
          if (user.length === 0) {
            return response.status(404).json({ error: "User not found!" });
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
        .select("id_user")
        .table("User")
        .join("Task", "User.id_team_user", "Task.id_team_task")
        .where({ "User.id_user": user, "Task.id_task": task })
        .then((userTaskBelongsTeam) => {
          if (userTaskBelongsTeam.length === 0) {
            return response.status(404).json({
              error: "User and task doesn't belongs to the same team!",
            });
          }
        });

      await database
        .insert({ id_user: user, id_task: task })
        .into("User_Task")
        .then((taskAssignedToUser) => {
          console.log(taskAssignedToUser);
          response
            .status(201)
            .json({ message: "User successfully assigned to do task" });
        });
    } catch (error) {
      console.log("Something went wrong when assigning user with task!", error);
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
