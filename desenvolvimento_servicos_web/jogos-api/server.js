const express = require("express");
const connectDB = require("./config/db");
const jogoRoutes = require("./routes/jogoRoutes");
const pontuacaoRoutes = require("./routes/pontuacaoRoutes");
const jogardorRoutes = require("./routes/jogadorRoutes");
const app = express();
const PORT = 3000;
// Conecta ao banco de dados MongoDB
connectDB();
// Middleware para tratar JSON
app.use(express.json());
// Rotas principais
app.use("/jogos", jogoRoutes);
app.use("/jogadores", jogardorRoutes);
app.use("/pontuacoes", pontuacaoRoutes);
// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
