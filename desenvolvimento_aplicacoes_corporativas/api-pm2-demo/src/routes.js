const express = require("express");
// Cria uma nova instância de roteador
const router = express.Router();
// Rota de verificação de saúde (health check)
router.get("/health", (req, res) => {
  // Retorna status da aplicação, tempo de execução (uptime) e data/hora atual
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(), // tempo em segundos desde que o servidor iniciou
    timestamp: Date.now(), // data e hora em milissegundos
  });
});
// Rota para obter informações de um usuário fictício
router.get("/users/:id", (req, res) => {
  // Retorna um objeto com o ID do usuário passado na URL e um nome fixo
  res.json({
    id: req.params.id,
    name: "Ada Lovelace", // nome simbólico para fins de teste
  });
});
// Rota que simula um erro interno de servidor
router.get("/error", (req, res) => {
  // Lança exceção para ser capturada pelo middleware de tratamento de erros
  throw new Error("Falha simulada no servidor");
});
module.exports = router;
