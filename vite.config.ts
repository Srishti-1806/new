// server/node-build.ts
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files
const spaPath = path.resolve(__dirname, "../spa");
app.use(express.static(spaPath));

// API route
app.get("/api/hello", (_, res) => {
  res.json({ message: "Hello from server!" });
});

// Catch-all fallback to SPA
app.get("*", (_, res) => {
  res.sendFile(path.join(spaPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
