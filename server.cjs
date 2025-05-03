const express = require('express');
const path = require('path');
const app = express();

const BASE_URL = "/PokeCare-main";

// 🔹 Asegurar que los archivos estáticos se sirvan correctamente
app.use(BASE_URL, express.static(path.join(__dirname, 'dist')));

// 🔹 Servir `index.html` correctamente desde `dist/`
app.get(BASE_URL + '/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 🔹 Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log(`✅ Servidor corriendo en puerto 3000 con BASE_URL ${BASE_URL} 🚀🔥`);
});
