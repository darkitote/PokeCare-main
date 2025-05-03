import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

dotenv.config(); // 🔹 Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "/PokeCare-main";

app.use(cors()); // 🔹 Habilitar CORS para el frontend
app.use(express.json());

// 🔹 Servir archivos estáticos correctamente
app.use(BASE_URL, express.static(path.join(__dirname, 'dist')));

// 🔹 Servir `index.html`, validando que exista primero
app.get(BASE_URL + '/*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("❌ Error: index.html no encontrado en /dist/");
  }
});

// 🔹 Ruta de prueba para comprobar el estado del backend
app.get('/api/status', (req, res) => {
  res.json({ message: "✅ PokeCare Backend funcionando en Kubernetes!" });
});

// 🔹 Iniciar el servidor en el puerto 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT} con BASE_URL ${BASE_URL} 🚀🔥`);
});
