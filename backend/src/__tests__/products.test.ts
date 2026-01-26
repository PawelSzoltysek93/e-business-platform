import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../app";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "vitest";

let productId: string;

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/ebusiness-test");
});

describe("Products API", () => {
  //GET TEST
  it("GET /api/products should return 200 and array", async () => {
    const res = await request(app).get("/api/products");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toBeDefined();
  });

  //POST TEST
  it("POST /api/products should create product and return 201", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "Test product",
        price: 99.99,
        stock: 10,
        tags: ["test"],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test product");

    productId = res.body._id;
    console.log("Created product id:", productId);
  });

  //PATCH TEST
  it("PATCH /api/products/:id should update product price", async () => {
    const res = await request(app)
      .patch(`/api/products/${productId}`)
      .send({
        name: "Test product2",
        price: 149.99,
        stock: 21,
        tags: ["test2"],
      });

    console.log("PATCH response:", res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(149.99);
  });

  //DELETE TEST
  it("DELETE /api/products/:id should remove product", async () => {
    const res = await request(app).delete(`/api/products/${productId}`);

    expect(res.status).toBe(204);
    expect(res.body.length).toBe(undefined);
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
