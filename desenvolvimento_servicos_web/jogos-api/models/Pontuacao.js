const mongoose = require("mongoose");
// Esquema da coleção 'pontuacao', com referência à coleção 'jogos' e 'jogadores'
const pontuacaoSchema = new mongoose.Schema({
  jogo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jogo",
    required: true,
  },  
  jogador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jogador",
    required: true,
  },
  dataRegistro: {
    type: Date,
    default: Date.now,
  },
  pontuacao: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Pontuacao", pontuacaoSchema);
