const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
// middleware de erro (sempre no final)
router.use((err, req, res, next) => {
  console.error("Erro capturado:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
});
module.exports = router;
