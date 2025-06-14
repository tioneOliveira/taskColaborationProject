const request = require("supertest");
const app = require("../../start/app.js");
const db = require("../database/connection.js");

describe("Testa os softdeletes de entidades", () => {
  let token;
  const taskId = 1;
  const userId = 2;
  const teamId = 1;
  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admdasilva@teste.com", password: "000000" });

    token = res.body.token;
  });
  test("Deve deletar uma tarefa existente", async () => {
    const updateRes = await request(app)
      .delete(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Tarefa Atualizada" });

    expect(updateRes.statusCode).toBe(200);
  });

  test("Deve deletar um time existente", async () => {
    const updateRes = await request(app)
      .delete(`/team/${teamId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(updateRes.statusCode).toBe(200);
  });

  test("Deve deletar uma usuario existente", async () => {
    const updateRes = await request(app)
      .delete(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(updateRes.statusCode).toBe(200);
  });
  afterAll(async () => {
    db.destroy();
  });
});
