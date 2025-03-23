// Importando o Express
const express = require("express");
// Criando uma aplicação Express
const app = express();
// Middleware para permitir que o Express entenda JSON
app.use(express.json());
// Middleware para registrar logs das requisições
app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} - ${req.url}`);
  next();
});
// Simulação do banco de dados em memória
let filmes = [
  {
    id: 1,
    titulo: "O Poderoso Chefão",
    descricao: "Um épico sobre uma família mafiosa",
    ano: 1972,
    genero: "Drama",
    nota: 9.2,
  },
  {
    id: 2,
    titulo: "Matrix",
    descricao: "Um hacker descobre uma realidade alternativa",
    ano: 1999,
    genero: "Ficção Científica",
    nota: 8.7,
  },
  {
    id: 3,
    titulo: "Toy Story",
    descricao: "Brinquedos ganham vida quando ninguém está olhando",
    ano: 1995,
    genero: "Animação",
    nota: 8.3,
  },
];

// Rota para obter todos os filmes (com suporte a filtros por gênero)
app.get("/filmes", (req, res) => {
  const { genero } = req.query;
  if (genero) {
    const filtrados = filmes.filter(
      (item) => item.genero.toLowerCase() === genero.toLowerCase()
    );
    return res.json(filtrados);
  }
  res.json(filmes);
});

// Rota para obter um filme por ID
app.get("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filme = filmes.find((item) => item.id === id);
  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }
  res.json(filme);
});

// Rota para adicionar um novo filme
app.post("/filmes", (req, res) => {
  const { titulo, descricao, ano, genero, nota } = req.body;
  if (!titulo || !descricao || !ano || !genero || !nota) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }
  if (ano < 1900 || ano > new Date().getFullYear()) {
    return res
      .status(400)
      .json({ erro: "O ano deve ser entre 1900 e o ano atual" });
  }
  if (nota < 0 || nota > 10) {
    return res.status(400).json({ erro: "A nota deve ser entre 0 e 10" });
  }

  const novoFilme = {
    id: filmes.length + 1,
    titulo,
    descricao,
    ano,
    genero,
    nota,
  };
  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});

// Rota para atualizar um filme existente
app.put("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, ano, genero, nota } = req.body;
  const index = filmes.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }
  if (!titulo || !descricao || !ano || !genero || !nota) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }
  if (ano < 1900 || ano > new Date().getFullYear()) {
    return res
      .status(400)
      .json({ erro: "O ano deve ser entre 1900 e o ano atual" });
  }
  if (nota < 0 || nota > 10) {
    return res.status(400).json({ erro: "A nota deve ser entre 0 e 10" });
  }
  filmes[index] = { id, titulo, descricao, ano, genero, nota };
  res.json(filmes[index]);
});

// Rota para deletar um filme por ID
app.delete("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = filmes.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }
  filmes.splice(index, 1);
  res.status(204).send();
});

// Iniciar o servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
