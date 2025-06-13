const request = require("supertest");
const app = require("../../app.js");
const db = require("../database/connection.js");

describe("Testar endpoints relacionados a usuarios, ajustar o time que será atualizado e deletado.", () => {
  let token;
  const userId = 2;
  beforeAll(async () => {
    await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Adm da Silva",
        email: "admdasilva@teste.com",
        password: "000000",
        permission: "Admin",
        role: "Teste",
      });

    const adminLogReq = await request(app)
      .post("/login")
      .send({ email: "admdasilva@teste.com", password: "000000" });

    token = adminLogReq.body.token;
  });

  test("Deve criar um novo Usuario", async () => {
    const res = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Teste da Silva",
        email: "testedasilva@teste.com",
        password: "000000",
        role: "Teste",
      });

    expect(res.statusCode).toBe(201);
  });

  test("Deve listar um usuario", async () => {
    const updateRes = await request(app)
      .get(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(updateRes.statusCode).toBe(200);
  });

  test("Deve listar os usuarios", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("Deve atualizar um usuario", async () => {
    const updateRes = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Atualizado",
        role: "Usuario Atualizado",
        permission: "Admin",
      });

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
