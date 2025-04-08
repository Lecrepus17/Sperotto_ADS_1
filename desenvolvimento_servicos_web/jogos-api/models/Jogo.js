const mongoose = require("mongoose");
// Esquema da coleção 'jogos'
const jogoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  ano: { type: Number, required: true },
  plataforma: { type: String, required: true },
});
module.exports = mongoose.model("Jogo", jogoSchema);
