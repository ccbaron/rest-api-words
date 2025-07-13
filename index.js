// app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Cargar palabras desde archivo
const words = require("./data/words.json");

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Endpoints

// Iteración 1: Endpoint para devolver una palabra aleatoria
app.get("/api/v1/words", (req, res) => {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  res.json({ word: randomWord });
});

// Iteración 2: Filtrar por longitud con el parámetro length
app.get("/api/v1/words", (req, res) => {
  const { length } = req.query;
  if (length) {
    const filteredWords = words.filter(word => word.length === parseInt(length));
    if (filteredWords.length > 0) {
      const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      res.json({ word: randomWord });
    } else {
      res.status(404).json({ error: "No hay palabras con esa longitud" });
    }
  } else {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json({ word: randomWord });
  }
});

// Iteración 3: Endpoint para devolver los idiomas disponibles
const languages = ["zh", "pt-br", "es", "de", "it", "fr"];
app.get("/api/v2/languages", (req, res) => {
  res.json({ languages });
});

// Iteración 4: Endpoint para obtener una palabra aleatoria de la API externa
app.get("/api/v2/words", async (req, res) => {
  const { length, lang } = req.query;
  if (!languages.includes(lang)) {
    return res.status(400).json({ error: "Idioma no soportado. Consulta los idiomas válidos en /api/v2/languages" });
  }
  try {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}&lang=${lang}`);
    const data = await response.json();
    if (data.length > 0) {
      res.json({ word: data[0] });
    } else {
      res.status(404).json({ error: "No se encontró palabra" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener palabra de la API externa" });
  }
});

// 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});