// server/node-build.ts
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Enable __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend from dist/spa (adjust if your client build is elsewhere)
const spaPath = path.resolve(__dirname, "../spa");
app.use(express.static(spaPath));

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// SPA fallback: serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(spaPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
