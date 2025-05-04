import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": process.env.VITE_API_URL || "http://localhost:3000"
    },
    hmr: {
      clientPort: 3000
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
    publicDir: "public", // Asegura que los archivos estáticos se sirvan correctamente
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]"
      }
    }
  },
  cacheDir: "node_modules/.vite"
});

