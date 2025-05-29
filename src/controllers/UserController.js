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
}

module.exports = new UserController();
