// server/node-build.ts
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Create app
const app = express();

// Enable CORS
app.use(cors());

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to static frontend files (adjust if needed)
const spaPath = path.resolve(__dirname, "../spa");
app.use(express.static(spaPath));

// Sample API route
app.get("/api/hello", (_, res) => {
  res.json({ message: "Hello from backend!" });
});

// SPA fallback for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(spaPath, "index.html"));
});

// Start the server
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
