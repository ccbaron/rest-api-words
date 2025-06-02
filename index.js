// app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Cargar palabras desde archivo
const words = require("./data/words.json");

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Endpoints
app.get("/api/v1/words", (req, res) => {
  const { length } = req.query;

  let filteredWords = words;
  const wordLength = Number(length);

  if (length && (wordLength < 3 || wordLength > 13)) {
    return res.status(400).json({ error: "El parámetro length debe estar entre 3 y 13" });
  }

  if (length) {
    filteredWords = words.filter(word => word.length === wordLength);
  }

  if (!filteredWords.length) {
    return res.status(404).json({ error: "No hay palabras con esa longitud" });
  }

  const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];

  res.json({ word: randomWord });
});

// Idiomas disponibles para la API v2
const availableLanguages = ["zh", "pt-br", "es", "de", "it", "fr"];

// Endpoint para obtener los idiomas disponibles
app.get("/api/v2/languages", (req, res) => {
  res.json({ languages: availableLanguages });
});

// Endpoint para obtener una palabra aleatoria desde la API externa, permitiendo idioma y longitud
app.get("/api/v2/words", async (req, res) => {
  const { length, lang } = req.query;
  const wordLength = Number(length) || 5;
  const language = lang || "es";

  if (!availableLanguages.includes(language)) {
    return res.status(400).json({ error: "Idioma no soportado. Consulta los idiomas válidos en /api/v2/languages" });
  }

  try {
    const apiUrl = `https://random-word-api.herokuapp.com/word?length=${wordLength}&lang=${language}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      res.json({ word: data[0] });
    } else {
      res.status(404).json({ error: "No se encontró palabra" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la palabra externa" });
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
