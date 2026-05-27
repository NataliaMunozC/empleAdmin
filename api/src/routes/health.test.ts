import request from "supertest";
import { createApp } from "../app.js";

describe("GET /health", () => {
  it("returns a healthy status payload", async () => {
    const app = createApp();
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(typeof response.body.timestamp).toBe("string");
  });
});
