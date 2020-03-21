const supertest = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');


beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy();
})


test("welcome route", async () => {
	const res = await supertest(server).get("/")
	expect(res.statusCode).toBe(200)
	expect(res.type).toBe("application/json")
	expect(res.body.message).toBe("Hi")

})

test("register account register", async () => {
	const res = await supertest(server).post("/api/auth/register").send({ username: "jim", password:"bob" })
	expect(res.statusCode).toBe(201)
	// expect(res.body.message).toBe("username is already taken.")

})

test("register same account", async () => {
	const res = await supertest(server).post("/api/auth/register").send({ username: "jim2", password:"bob" })
	expect(res.statusCode).toBe(409)
	expect(res.body.message).toBe("username is already taken.")

})

test("login route not working", async () => {
  const res = await supertest(server).post("/api/auth/login").send({ username: "jim", password:"bob" })
  expect(res.statusCode).toBe(401);
})

test("login route not working", async () => {
  const res = await supertest(server).post("/api/auth/login").send({ username: "jim" })
  expect(res.statusCode).toBe(401);
})
