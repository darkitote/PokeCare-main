const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const BASE_URL = "/PokeCare-main";

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

// 🔹 Iniciar el servidor en el puerto 3000
app.listen(3000, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en puerto 3000 con BASE_URL ${BASE_URL} 🚀🔥`);
});
