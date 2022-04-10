import { setupRoutes } from "./router";
import express from "express";

export function setupExpress() {
  const app = express();

  app.use(setupRoutes());

  return app;
}
