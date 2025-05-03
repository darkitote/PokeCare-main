export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0", // Permite conexiones externas
    hmr: {
      clientPort: 443, // Si usas HTTPS en Minikube, ajusta el puerto
    },
  },
  base: "/",
});