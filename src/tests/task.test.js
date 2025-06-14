const request = require("supertest");
const app = require("../../start/app.js");
const db = require("../database/connection.js");

describe("Testar endpoints relacionados a tarefas, ajustar o time que será atualizado.", () => {
  let token;
  const taskId = 1;
  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admdasilva@teste.com", password: "000000" });

    token = res.body.token;
  });

  test("Deve criar uma nova tarefa", async () => {
    const res = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tarefa Teste",
        description: "Tarefa teste descrição.",
        status: "Ongoing",
      });

    expect(res.statusCode).toBe(201);
  });

  test("Deve listar uma tarefa", async () => {
    const updateRes = await request(app)
      .get(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(updateRes.statusCode).toBe(200);
  });

  test("Deve listar as tarefas", async () => {
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("Deve atualizar uma tarefa existente", async () => {
    const updateRes = await request(app)
      .put(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tarefa Atualizada",
        description: "Tarefa Atualizada descrição",
        status: "Late",
      });

    expect(updateRes.statusCode).toBe(200);
  });

  afterAll(async () => {
    db.destroy();
  });
});
