const express = require('express');
const path = require('path');
const app = express();

const BASE_URL = "/PokeCare-main";

// 🔹 Servir archivos estáticos correctamente
app.use(BASE_URL + '/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
    if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
    if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
  }
}));

// 🔹 Servir `index.html` en la ruta principal
app.get(BASE_URL + '/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 🔹 Manejo de rutas desconocidas con una respuesta clara
app.use((req, res, next) => {
  if (!req.path.startsWith(BASE_URL)) {
    return res.status(404).json({ error: "Ruta no encontrada" });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 🔹 Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log(`✅ Servidor corriendo en puerto 3000 con BASE_URL ${BASE_URL} 🚀🔥`);
});
