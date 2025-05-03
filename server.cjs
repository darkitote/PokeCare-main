const express = require('express');
const path = require('path');
const app = express();

const BASE_URL = "/PokeCare-main";  // 🔹 Definir la ruta base

// Servir archivos estáticos correctamente
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
  }
}));

// Manejo de la ruta base para servir `index.html`
app.get(BASE_URL + '/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de cualquier otra ruta para evitar errores 404
app.get('*', (req, res) => {
  res.redirect(BASE_URL + '/');
});

app.listen(3000, () => {
  console.log(`✅ Servidor corriendo en puerto 3000 con BASE_URL ${BASE_URL} 🚀🔥`);
});
