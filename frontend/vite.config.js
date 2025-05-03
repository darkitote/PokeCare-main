import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": "http://10.101.17.41:3000" // Redirección al backend
    },
    hmr: {
      clientPort: 3000,
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
    publicDir: false,
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
