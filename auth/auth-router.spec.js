const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
})

describe('users', () => {
  // Register Tests
  it('Register should return 201', async () => {
    const res = await request(server)
          .post('/api/auth/register')
          .send({ username: "henry", password: "henrypass", phoneNumber: "9893248724" });
    expect(res.status).toBe(201);
  });

  it("Login should return 200 & application/json", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "henry", password: "henrypass",  phoneNumber: "9899848724" });
    expect(res.type).toBe("application/json");

    // Login Tests
    const res1 = await request(server)
      .post('/api/auth/login')
      .send({ username: "henry", password: "henrypass" });
    expect(res1.status).toBe(200);

    const res2 = await request(server)
      .post("/api/auth/login")
      .send({ username: "henry", password: "henrypass" });
    expect(res2.type).toBe("application/json");

    // User Update Tests
    const res3 = await request(server)
      .put("/api/auth/4")
      .send({ phoneNumber: "9899848725" });
    expect(res3.type).toBe("application/json");

    const res4 = await request(server)
      .put("/api/auth/4")
      .send({ phoneNumber: "9899848725" });
    expect(res3.status).toBe(200);
  });
});
