# Task Collaboration Project

> Empower teams, streamline tasks, achieve greatness together.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://example.com)
[![License](https://img.shields.io/badge/license-GNU-blue)](LICENSE)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

🚀 Built with ❤️ by Tione Oliveira, Gabriel Hartmann and Nicolas Donato

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [API Documentation](#api-documentation)
- [UML Diagrams](#uml-diagrams)
- [License](#license)

---

## Overview

**Task Collaboration Project** is a backend API that enables task, user, and team management through a secure, modular, and role-based approach.

### Key Features

- ✅ **RESTful API** for creating, updating, deleting, and managing users, tasks, and teams.
- 🔐 **JWT Authentication with Role-Based Access Control**.
- 🧩 **Modular structure** using Express.js, Knex, and MySQL.
- 📦 **Integrated Swagger UI** for live API documentation.
- ⚙️ **Testable architecture** with Jest and Supertest support.

---

## Getting Started

### Prerequisites

- **Node.js** and **npm**
- **MySQL** database

---

### Installation

```bash
git clone https://github.com/username/taskcolaborationproject.git
cd taskcolaborationproject
npm install
```

---

### Usage

```bash
npm start
```

Then visit: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

### Testing

```bash
npm test
```

---

## API Documentation

Access the live interactive documentation:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## UML Diagrams

### 🧭 Use Case Diagram

```mermaid
%%{init: {'theme': 'default'}}%%
graph TD
  user[User]
  UC1[Login]
  UC2[Create User]
  UC3[Delete User]
  UC4[Create Task]
  UC5[Update Task]
  UC6[Create Team]
  UC7[List Team Tasks]

  user --> UC1
  user --> UC2
  user --> UC3
  user --> UC4
  user --> UC5
  user --> UC6
  user --> UC7
```

---

### 🧱 Component Diagram

```mermaid
%%{init: {'theme': 'default'}}%%
graph TD
  App["app.js / server.js"]
  Login[loginRoute]
  User[userRoutes]
  Task[taskRoutes]
  Team[teamRoutes]
  Swagger[config/swagger.js]
  Auth[JWT Auth]
  DB[(MySQL via Knex)]

  App --> Login
  App --> User
  App --> Task
  App --> Team
  App --> Swagger
  Login --> Auth
  User --> Auth
  Task --> Auth
  Team --> Auth
  App --> DB
```

---

### 🔁 Sequence Diagram (Create Task)

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
  Express->>roleAuth: Validate role (Admin)
  roleAuth-->>Express: OK
  Express->>TaskController: newTask(req, res)
  TaskController->>DB: INSERT INTO tasks
  DB-->>TaskController: Result
  TaskController-->>Express: res.status(201).json(...)
  Express-->>Client: 201 Created
```

---

## 📄 License

This project is licensed under the **GNU License**.
