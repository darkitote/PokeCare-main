import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",  
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: {
      clientPort: 443,
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
    rollupOptions: {
      input: "src/index.html", 
      main: "src/main.jsx", // ✅ Asegura que `index.html` esté en `dist/`
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  cacheDir: "node_modules/.vite",
});
