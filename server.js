const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos correctamente
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Manejo de rutas para evitar la redirección incorrecta
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('✅ Servidor corriendo en puerto 3000 🚀🔥');
});
