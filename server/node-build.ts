import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/hello", (_req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  return app;
}

// Run server only in production
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}
