const mongoose = require("mongoose");
// Esquema da coleção 'jogadores'
const jogadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("Jogador", jogadorSchema);
