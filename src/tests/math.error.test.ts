import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import app from "../app.js";
import { prisma } from "../utils/prisma.js";

describe("Math API Error Handling Tests", () => {
  beforeEach(async () => {
    await prisma.operation.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return error for invalid addition input", async () => {
    const response = await request(app)
      .post("/api/addition")
      .send({ a: "not-a-number", b: 20 })
      .expect(400);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid input: 'a' and 'b' must be numbers"
    );
  });

  it("should return error for missing addition input", async () => {
    const response = await request(app)
      .post("/api/addition")
      .send({ a: 10 })
      .expect(400);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid input: 'a' and 'b' must be numbers"
    );
  });

  it("should return error for invalid fibonacci input", async () => {
    const response = await request(app)
      .get("/api/fibonacci/not-a-number")
      .expect(400);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid input: count must be a non-negative number"
    );
  });

  it("should return error for negative fibonacci input", async () => {
    const response = await request(app).get("/api/fibonacci/-1").expect(400);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid input: count must be a non-negative number"
    );
  });

  it("should return error for invalid factorial input", async () => {
    const response = await request(app)
      .get("/api/factorial/not-a-number")
      .expect(400);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid input: number must be a non-negative number"
    );
  });

  it("should return error for negative factorial input", async () => {
    const response = await request(app).get("/api/factorial/-5").expect(400);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid input: number must be a non-negative number"
    );
  });

  it("should return error for invalid prime number input", async () => {
    const response = await request(app)
      .get("/api/prime-number/abc")
      .expect(400);

    expect(response.body).toHaveProperty(
      "error",
      "Invalid input: number must be an integer"
    );
  });

  it("should return error for non-existing operation when deleting", async () => {
    const nonExistentId = 9999;
    const response = await request(app)
      .delete(`/api/operations/${nonExistentId}`)
      .expect(404);

    expect(response.body).toHaveProperty("error", "Operation not found");
  });

  it("should return error for invalid operation ID format when deleting", async () => {
    const response = await request(app)
      .delete("/api/operations/invalid-id")
      .expect(400);

    expect(response.body).toHaveProperty("error", "Invalid ID format");
  });
});
