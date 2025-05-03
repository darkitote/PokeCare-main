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
    assetsDir: "assets", // ✅ Forzamos que los assets estén en `dist/assets/`
    manifest: true, // ✅ Activa la generación del `manifest.json` en `dist/assets/`
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  },
  cacheDir: "node_modules/.vite"
});
