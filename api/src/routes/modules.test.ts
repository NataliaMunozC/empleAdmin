import request from "supertest";
import { createApp } from "../app.js";

describe("GET /modules", () => {
  it("returns domain modules for social security operations", async () => {
    const app = createApp();
    const response = await request(app).get("/modules");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      modules: ["empleadas", "seguridad-social", "pagos", "liquidaciones", "reportes"]
    });
  });
});
