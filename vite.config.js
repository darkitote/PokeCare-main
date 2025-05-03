import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/PokeCare-main/",
  server: {
    port: 3000, // Asegura que coincida con el puerto que exponemos en Docker
    host: "0.0.0.0", // Permite conexiones desde fuera del contenedor
  }
});
