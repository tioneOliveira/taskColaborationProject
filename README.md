# Task Collaboration Project

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://example.com)
[![License](https://img.shields.io/badge/license-GNU-blue)](LICENSE)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

🚀 Built with ❤️ by Gabriel Hartmann, Nicolas Donato, and Tione Oliveira

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Usage](#usage)
  - [Testing](#testing)
- [API Documentation](#api-documentation)
- [UML Diagrams](#uml-diagrams)
- [License](#license)

---

## Overview

**Task Collaboration Project** is a backend API that enables task, user, and team management through a secure, modular, and role-based approach.

### Key Features

- ✅ **RESTful API** for managing users, tasks, and teams
- 🔐 **JWT Authentication & Role-Based Access Control**
- 🧩 **Modular architecture** using Express, Controllers, Middleware
- 📦 **Swagger UI** for live API documentation
- 🧪 **Integrated testing** with Jest & Supertest
- 🗂️ **Data integrity** via MySQL and Knex.js

---

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL

### Installation

```bash
git clone https://github.com/username/taskcolaborationproject.git
cd taskcolaborationproject
npm install
```

### Environment Configuration

Create a `.env` file at the root with the following content:

```env
LISTENING_TO_PORT=3000
NODE_ENV=development
```

---

### Usage

```bash
npm start
```

Then visit: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

> On `npm start`, Swagger documentation is auto-generated via [swagger-autogen](https://github.com/davibaltar/swagger-autogen).
> You don't need to manually edit `swagger_output.json`.

---

### Testing

```bash
npm test
```

---

## API Documentation

Access the live interactive documentation:

- [Swagger UI](http://localhost:3000/api-docs)
- [OpenAPI JSON](./swagger_output.json)

---

## UML Diagrams

### 🧭 Use Case Diagram

```mermaid
%%{init: {'theme': 'default'}}%%
graph TD
  user[User]
  login[Login]
  createUser[Create User]
  deleteUser[Delete User]
  updateUser[Update User]
  assignUserToTeam[Assign User to Team]
  assignUserTask[Assign Task to User]
  listUserTasks[List User Tasks]
  listUser[List User Info]
  listAllUsers[List All Users]

  createTeam[Create Team]
  deleteTeam[Delete Team]
  updateTeam[Update Team]
  listTeams[List Teams]
  listTeamTasks[List Team Tasks]
  listTeamUsers[List Team Users]

  createTask[Create Task]
  deleteTask[Delete Task]
  updateTask[Update Task]
  listTasks[List All Tasks]
  getTask[Get Task Details]

  user --> login
  user --> createUser
  user --> deleteUser
  user --> updateUser
  user --> assignUserToTeam
  user --> assignUserTask
  user --> listUserTasks
  user --> listUser
  user --> listAllUsers

  user --> createTeam
  user --> deleteTeam
  user --> updateTeam
  user --> listTeams
  user --> listTeamTasks
  user --> listTeamUsers

  user --> createTask
  user --> deleteTask
  user --> updateTask
  user --> listTasks
  user --> getTask
```

---

### 🧱 Component Diagram

```mermaid
%%{init: {'theme': 'default'}}%%
graph TD
  Server["server.js"]
  ExpressApp[Express Application]
  Middleware[freeAuth & roleAuth]
  Login[loginRouter]
  User[userRouter]
  Task[taskRouter]
  Team[teamRouter]
  Swagger[swagger_output.json]
  Controller[Controllers]
  DB[(MySQL via Knex)]

  Server --> ExpressApp
  ExpressApp --> Middleware
  ExpressApp --> Login
  ExpressApp --> User
  ExpressApp --> Task
  ExpressApp --> Team
  ExpressApp --> Swagger
  Login --> Controller
  User --> Controller
  Task --> Controller
  Team --> Controller
  Controller --> DB
```

---

### 🔁 Sequence Diagram – Create Task

```mermaid
%%{init: {'theme': 'default'}}%%
sequenceDiagram
  actor Client
  participant Express
  participant freeAuth
  participant roleAuth
  participant TaskController
  participant DB as MySQL

  Client->>Express: POST /task (with JWT)
  Express->>freeAuth: Validate JWT
  freeAuth-->>Express: OK
  Express->>roleAuth: Check role Admin
  roleAuth-->>Express: OK
  Express->>TaskController: newTask(req, res)
  TaskController->>DB: INSERT INTO tasks
  DB-->>TaskController: Result
  TaskController-->>Express: res.status(201)
  Express-->>Client: 201 Created
```

---

### 🔁 Sequence Diagram – Assign User to Team

```mermaid
%%{init: {'theme': 'default'}}%%
sequenceDiagram
  actor Admin
  participant Express
  participant freeAuth
  participant roleAuth
  participant UserController
  participant DB as MySQL

  Admin->>Express: PUT /team/:team/user/:user
  Express->>freeAuth: Validate JWT
  freeAuth-->>Express: OK
  Express->>roleAuth: Check role Admin
  roleAuth-->>Express: OK
  Express->>UserController: assignUserToTeam(req, res)
  UserController->>DB: UPDATE users SET team_id = ?
  DB-->>UserController: OK
  UserController-->>Express: res.status(200)
  Express-->>Admin: 200 OK
```

---

### 🗃️ Entity-Relationship Diagram – Logical Overview

```mermaid
%%{init: {'theme': 'default'}}%%
erDiagram
  USERS ||--o{ USER_TASK : assigned_tasks
  TEAMS ||--o{ TEAM_TASK : manages
  USERS ||--o{ TEAMS : member_of
  TASKS ||--o{ USER_TASK : assigned_to_users
  TASKS ||--o{ TEAM_TASK : belongs_to_team

  USERS {
    int id PK
    string name
    string email
    string password
    string role
    string permission
    int team_id FK
  }
  TASKS {
    int id PK
    string title
    string description
    string status
    timestamp start
    timestamp deadline
  }
  TEAMS {
    int id PK
    string name
  }
  USER_TASK {
    int user_id FK
    int task_id FK
  }
  TEAM_TASK {
    int team_id FK
    int task_id FK
  }
```

---

## 📄 License

This project is licensed under the **GNU License**.
