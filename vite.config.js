import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || "/PokeCare-main/",
  server: {
    port: 3000,
    host: "0.0.0.0", // Permite conexiones externas dentro del contenedor
    hmr: {
      clientPort: 443, // Ajusta WebSocket si usas HTTPS en Minikube
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets"
  }
});
