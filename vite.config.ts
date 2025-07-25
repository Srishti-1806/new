// vite.config.ts
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa",  // ✅ Required so Express can serve it
    emptyOutDir: true,   // ✅ Clean output folder before build
  },
  plugins: [
    react(),
    command === "serve" ? expressPlugin() : null, // ✅ for dev only
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const { createServer } = require("./server");
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
