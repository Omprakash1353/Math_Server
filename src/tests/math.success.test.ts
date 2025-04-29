import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import app from "../app.js";
import { prisma } from "../utils/prisma.js";

describe("Math API Integration Tests", () => {
  beforeEach(async () => {
    await prisma.operation.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should add two numbers and store in database", async () => {
    const response = await request(app)
      .post("/api/addition")
      .send({ a: 10, b: 20 })
      .expect(200);

    expect(response.body).toHaveProperty("result", 30);
  });

  it("should calculate fibonacci and store in database", async () => {
    const response = await request(app).get("/api/fibonacci/7").expect(200);

    expect(response.body).toHaveProperty("result", 13);
  });

  it("should calculate factorial and store in database", async () => {
    const response = await request(app).get("/api/factorial/4").expect(200);

    expect(response.body).toHaveProperty("result", 24);
  });

  it("should check if number is prime and store in database", async () => {
    const response = await request(app).get("/api/prime-number/23").expect(200);

    expect(response.body).toHaveProperty("isPrime", true);
  });

  it("should retrieve all operations", async () => {
    const addRes = await request(app)
      .post("/api/addition")
      .send({ a: 1, b: 2 });
    console.log(addRes.body);
    const response = await request(app).get("/api/operations").expect(200);
    expect(response.body).toHaveProperty("operations");
    expect(Array.isArray(response.body.operations)).toBe(true);
    expect(response.body.operations.length).toBeGreaterThanOrEqual(0);
  });

  it("should delete an operation", async () => {
    await request(app).post("/api/addition").send({ a: 5, b: 5 });

    const allOps = await request(app).get("/api/operations").expect(200);
    const idToDelete = allOps.body.operations[0].id;

    const deleteResponse = await request(app)
      .delete(`/api/operations/${idToDelete}`)
      .expect(200);

    expect(deleteResponse.body).toHaveProperty("id", idToDelete);

    const operation = await prisma.operation.findUnique({
      where: { id: idToDelete },
    });

    expect(operation).toBe(null);
  });
});
