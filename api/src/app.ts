import cors from "cors";
import express from "express";
import healthRouter from "./routes/health.js";
import modulesRouter from "./routes/modules.js";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.status(200).json({ service: "empleAdmin-api", status: "running" });
  });

  app.use("/health", healthRouter);
  app.use("/modules", modulesRouter);

  return app;
};
