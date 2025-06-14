const request = require("supertest");
const app = require("../../start/app.js");
const db = require("../database/connection.js");

describe("Testa as os endpoinds que relacionam usuarios e tarefas", () => {
  let token;
  const userId = 2;
  const taskId = 1;

  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admdasilva@teste.com", password: "000000" });

    token = res.body.token;
  });
  test("Deve dar uma usuario a um time", async () => {
    const res = await request(app)
      .put(`/user/${userId}/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
  });

  test("Deve listar os usuarios de um time", async () => {
    const res = await request(app)
      .get(`/user/${userId}/tasks`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  afterAll(async () => {
    db.destroy();
  });
});
