const express = require("express");
const sequelize = require("./config/db");
const animalRoutes = require("./routes/animalRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = 3000;
// Conecta ao banco de dados
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar ao MySQL:', err);
});
app.use(express.json());
app.use('/users', userRoutes);
app.use('/animals', animalRoutes);

