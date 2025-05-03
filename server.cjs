const express = require('express');
const path = require('path');
const app = express();

// Definir la ruta base del servidor
const BASE_URL = "/PokeCare-main";

// Servir archivos estáticos correctamente
app.use(BASE_URL + '/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Manejar la ruta base correctamente
app.get(BASE_URL + '/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log(`✅ Servidor corriendo en puerto 3000 con BASE_URL ${BASE_URL} 🚀🔥`);
});
