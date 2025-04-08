const express = require("express");
const router = express.Router();
const jogadorController = require("../controllers/jogadorController");
// Rotas para jogador
router.post("/", jogadorController.criarJogador);
router.get("/", jogadorController.listarJogadores);
module.exports = router;
