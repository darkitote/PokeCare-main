import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "/api";

app.use(cors());
app.use(express.json());

// ✅ Ruta de estado para verificar si el backend está operativo
app.get(BASE_URL + "/status", (req, res) => {
  res.json({ status: "ok", message: "PokeCare Backend funcionando 🚀" });
});

// ✅ Ruta para obtener datos de un Pokémon por ID o nombre
app.get(BASE_URL + "/pokemon/:id", async (req, res) => {
  try {
    const pokemonId = req.params.id;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener Pokémon:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ✅ Ruta para obtener una lista de Pokémon con límite de cantidad
app.get(BASE_URL + "/pokemons", async (req, res) => {
  try {
    const limit = req.query.limit || 20;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

    if (!response.ok) {
      return res.status(500).json({ error: "Error al obtener la lista de Pokémon" });
    }

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("❌ Error al obtener lista de Pokémon:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}${BASE_URL}`);
});
