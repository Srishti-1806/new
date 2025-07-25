import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();
  app.use(cors());

  app.get("/api", (_, res) => {
    res.json({ message: "API is working!" });
  });

  return app;
}
