import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 🔹 Asegurar la importación de React

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || "/PokeCare-main/",
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
    manifest: true, // 🔹 Se mantiene activado para generar `manifest.json`
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  },
  cacheDir: "node_modules/.vite", // 🔹 Evita que Vite almacene archivos ocultos en `.vite/`
});
