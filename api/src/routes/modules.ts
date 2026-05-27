import { Router } from "express";

const modulesRouter = Router();

modulesRouter.get("/", (_req, res) => {
  res.status(200).json({
    modules: ["empleadas", "seguridad-social", "pagos", "liquidaciones", "reportes"]
  });
});

export default modulesRouter;
