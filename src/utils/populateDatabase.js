const UserService = require("../controllers/User/UserServices");
const TaskService = require("../controllers/Task/TaskServices");
const TeamService = require("../controllers/Team/TeamServices");
const db = require("../database/connection.js");

async function populate() {
  await UserService.createUser({
    name: "Admin da Silva",
    role: "Admin",
    password: "admin123",
    email: "admin@email.com",
    permission: "Admin",
  });
  await UserService.createUser({
    name: "Tione Oliveira",
    role: "CEO",
    password: "tione123",
    email: "tionefilho@gmail.com",
    permission: "Admin",
  });
  await UserService.createUser({
    name: "Gabriel Hartmann",
    role: "maneger",
    permission: "Manager",
    password: "alicePass123",
    email: "gehartman5@gmail.com",
  });
  await UserService.createUser({
    name: "Bob Smith",
    role: "manager",
    permission: "Manager",
    password: "bobSecure456",
    email: "bobsmith@example.com",
  });
  await UserService.createUser({
    name: "Charlie Lee",
    role: "developer",
    password: "charlieDev789",
    email: "charlielee@example.com",
  });
  await UserService.createUser({
    name: "Diana Evans",
    role: "tester",
    password: "dianaTest321",
    email: "dianaevans@example.com",
  });

  await TaskService.createTask({
    name: "Design Database Schema",
    description: "Create and finalize the database schema for the project.",
    status: "Ongoing",
    start: "2024-06-01",
    deadline: "2024-06-10",
  });
  await TaskService.createTask({
    name: "Implement Authentication",
    description: "Develop user authentication and authorization features.",
    status: "Ongoing",
    start: "2024-06-02",
    deadline: "2024-06-12",
  });
  await TaskService.createTask({
    name: "Setup CI/CD Pipeline",
    description: "Configure continuous integration and deployment pipeline.",
    status: "Ongoing",
    start: "2024-06-03",
    deadline: "2024-06-15",
  });
  await TaskService.createTask({
    name: "Frontend UI Development",
    description: "Build the main user interface for the application.",
    status: "Ongoing",
    start: "2024-06-04",
    deadline: "2024-06-20",
  });
  await TaskService.createTask({
    name: "Write Unit Tests",
    description: "Write unit tests for core modules.",
    status: "Ongoing",
    start: "2024-06-05",
    deadline: "2024-06-18",
  });

  await TeamService.createTeam("Time Alpha");
  await TeamService.createTeam("Time Sigma");

  await UserService.assignUserToTeam(1, 1);
  await UserService.assignUserToTeam(1, 2);
  await UserService.assignUserToTeam(1, 3);
  await UserService.assignUserToTeam(2, 4);
  await UserService.assignUserToTeam(2, 5);

  await TaskService.assignTaskToTeam(1, 1);
  await TaskService.assignTaskToTeam(1, 2);
  await TaskService.assignTaskToTeam(1, 3);
  await UserService.assignUserToTeam(2, 4);
  await UserService.assignUserToTeam(2, 5);

  await UserService.assignUserWithTask(1, 1);
  await UserService.assignUserWithTask(2, 2);
  await UserService.assignUserWithTask(3, 3);
  await UserService.assignUserWithTask(4, 4);
  await UserService.assignUserWithTask(5, 5);
  db.destroy();
}

populate();
