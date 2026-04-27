require("dotenv").config();
const express = require("express");
const users = require("./users");
const jwt = require("jsonwebtoken");
const app = new express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  return res.json({ message: "Hello World!" });
});

app.post("/login", (req, res) => {
  const { login, pwd } = req.body;
  const user = users.find((u) => u.login === login && u.pwd === pwd);

  if (!user) {
    return res.status(403).json({ message: "Usuário ou senha inválidos!" });
  }
  const token = jwt.sign({ id: user.id }, PRIVATE_KEY, { expiresIn: "30s" });

  return res.json({ token });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};  

app.get("/dashboard", verifyToken, (req, res) => {
    return res.json({ message: `Bem-vindo ao painel de controle, ${req.user.id}!` });
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
