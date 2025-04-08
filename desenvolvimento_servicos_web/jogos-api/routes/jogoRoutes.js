const express = require("express");
const router = express.Router();
const jogoController = require("../controllers/jogoController");
// Rotas para jogo
router.post("", jogoController.criarJogo);
router.get("", jogoController.listarJogos);
router.get("/:jogoId", jogoController.buscarJogo);
router.put("/:jogoId", jogoController.atualizarJogo);
router.delete("/:jogoId", jogoController.deletarJogo);
module.exports = router;
