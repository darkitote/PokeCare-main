import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/PokeCare-main/",
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
    manifest: "assets/manifest.json", // ✅ Forzar la ubicación correcta
    rollupOptions: {
      input: {
        main: "src/main.jsx", // 🔹 Asegura que `src/main.jsx` se incluya en el `manifest.json`
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  },
  cacheDir: "node_modules/.vite"
});
