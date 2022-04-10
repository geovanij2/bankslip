import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

export function setupRoutes(): Router {
  const router = Router();
  readdirSync(path.join(__dirname, "../routes")).map(async (fileName) => {
    (await import(`../routes/${fileName}`)).default(router);
  });
  return router;
}
