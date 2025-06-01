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
app.get("/api/v1/word", (req, res) => {
  const { length } = req.query;

  let filteredWords = words;

  if (length && (Number(length) < 3 || Number(length) > 13)) {
    filteredWords = words.filter(word => word.length === Number(length));
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
