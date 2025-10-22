const request = require("supertest");
const app = require("../src/app");
describe("GET /ping", () => {
  test("GET /ping deve retornar 200 e { ok: true }", async () => {
    const res = await request(app).get("/ping");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
describe("POST /users", () => {
  test("cria usuário com 201 e retorna JSON", async () => {
    const res = await request(app)
      .post("/users")
      .send({ nome: "Ana", email: "ana@ex.com" })
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toEqual({ id: 1, nome: "Ana", email: "ana@ex.com" });
  });
  test("retorna 400 quando payload é inválido", async () => {
    const res = await request(app).post("/users").send({ nome: "SemEmail" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ erro: "Dados inválidos" });
  });
});
