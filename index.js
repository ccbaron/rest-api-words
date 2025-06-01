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

  if (length && (Number(length) < 3 || Number(length) > 13)) {
    return res.status(400).json({ error: "El parámetro length debe estar entre 3 y 13" });
  }

  if (length) {
    filteredWords = words.filter(word => word.length === Number(length));
  }

  if (!filteredWords.length) {
    return res.status(404).json({ error: "No hay palabras con esa longitud" });
  }

  const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];

  res.json({ word: randomWord });
});

// 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
