const request = require("supertest");
const app = require("../../start/app.js");
const db = require("../database/connection.js");

describe("Testa as os endpoinds que relacionam times e", () => {
  let token;
  const taskId = 1;
  const teamId = 1;

  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admdasilva@teste.com", password: "000000" });

    token = res.body.token;
  });
  test("Deve dar uma tarefa a um time", async () => {
    const res = await request(app)
      .put(`/team/${teamId}/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
  });

  test("Deve listar as tarefas de um time", async () => {
    const res = await request(app)
      .get(`/team/${teamId}/tasks`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
  afterAll(async () => {
    db.destroy();
  });
});
