const request = require("supertest");
const app = require("../../start/app.js");
const db = require("../database/connection.js");

describe("Testar endpoints relacionados a times, ajustar o time que será atualizado", () => {
  let token;
  const teamId = 1;
  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admdasilva@teste.com", password: "000000" });

    token = res.body.token;
  });

  test("Deve criar um novo time", async () => {
    const res = await request(app)
      .post("/team")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Equipe Teste" });

    expect(res.statusCode).toBe(201);
  });

  test("Deve listar um time", async () => {
    const updateRes = await request(app)
      .get(`/team/${teamId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(updateRes.statusCode).toBe(200);
  });

  test("Deve listar os times", async () => {
    const res = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("Deve atualizar um time existente", async () => {
    const updateRes = await request(app)
      .put(`/team/${teamId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Equipe Atualizada" });

    expect(updateRes.statusCode).toBe(200);
  });

  afterAll(async () => {
    db.destroy();
  });
});
