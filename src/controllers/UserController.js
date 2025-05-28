const database = require("../database/connection");

class UserController {
  async newUser(request, response) {
    try {
      const { name, email, password, role } = await request.body;
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
      console.log("Something went wrong when creating a new user", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listAllUsers(request, response) {
    try {
      await database
        .select("*")
        .table("User")
        .where({ deleted_at: null })
        .then((user) => {
          console.log(user);
          response.status(200).json(user);
        });
    } catch (error) {
      console.log("Something went wrong when listing all users", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listUser(request, response) {
    const { id } = await request.params;
    try {
      await database
        .select("*")
        .table("User")
        .where({ id_user: id })
        .then((user) => {
          console.log(user);
          response.status(200).json(user);
        });
    } catch (error) {
      console.log("Something went wrong when listing the user!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async updateUser(request, response) {
    const { id } = await request.params;
    const { name, role, email, password, permission } = await request.body;

    const updatedUser = {};
    if (name) updatedUser.name_user = name;
    if (role) updatedUser.role_user = role;
    if (email) updatedUser.email_user = email;
    if (password) updatedUser.password_user = password;
    if (permission) updatedUser.permission_user = permission;
    if (Object.keys(updatedUser).length === 0) {
      return response.status(400).json({ error: "No data to update!" });
    }

    try {
      await database
        .table("User")
        .where({ id_user: id })
        .update(updatedUser)
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
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
    const { id } = await request.params;

    try {
      await database
        .table("User")
        .where({ id_user: id, deleted_at: null })
        .update({ deleted_at: database.fn.now() })
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
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
