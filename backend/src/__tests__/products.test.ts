import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../app";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "vitest";
import { Product } from "../models/product.model";

let productId: string;

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/ebusiness-test");

  await Product.deleteMany({});

  await Product.create([
    {
      name: "Cheap product",
      price: 50,
      stock: 10,
      tags: ["test"],
    },
    {
      name: "Mid product",
      price: 150,
      stock: 5,
      tags: ["test"],
    },
    {
      name: "Expensive product",
      price: 300,
      stock: 2,
      tags: ["test"],
    },
  ]);
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

//SORT TEST
it("GET /api/products should sort products by price ascending", async () => {
  const res = await request(app).get(
    "/api/products?sortBy=price&order=asc&limit=10",
  );

  expect(res.status).toBe(200);

  const prices = res.body.data.map((p: any) => p.price);

  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

//FILTER TEST
it("GET /api/products should filter products by minPrice", async () => {
  const res = await request(app).get("/api/products?minPrice=100&limit=10");

  expect(res.status).toBe(200);

  res.body.data.forEach((product: any) => {
    expect(product.price).toBeGreaterThanOrEqual(100);
  });
});
