const express = require("express");
const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/users", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: "Dados inválidos" });
  res.status(201).json({ id: 1, nome, email });
});

module.exports = app;
