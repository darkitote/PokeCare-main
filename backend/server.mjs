import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Definir manualmente `__dirname` en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "/api";  // Ajusta según la configuración de tu frontend

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Servir archivos estáticos
app.use(BASE_URL, express.static(path.join(__dirname, "dist")));

// 🔹 Rutas de ejemplo
app.get(BASE_URL + "/status", (req, res) => {
  res.json({ message: "PokeCare Backend funcionando correctamente 🚀🔥" });
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}${BASE_URL}`);
});
