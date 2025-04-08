const express = require("express");
const router = express.Router();
const pontuacaoController = require("../controllers/pontuacaoController");
// Rotas para pontuacao
router.post("/", pontuacaoController.criarPontuacao);
router.get("/ranking/:jogoId", pontuacaoController.listarRanking);
router.get("/jogos/populares", pontuacaoController.listarPopulares);
module.exports = router;
