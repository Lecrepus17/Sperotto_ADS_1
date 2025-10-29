const express = require("express");
const routes = require("./routes");
// Cria a instância principal da aplicação Express
const app = express();
// Permite que a aplicação interprete requisições com corpo JSON
app.use(express.json());
/**
* Middleware simples para medir a latência (tempo de resposta) de cada
requisição.
* É executado antes de todas as rotas e usa o evento "finish" da resposta
(res)
* para calcular o tempo decorrido entre o início e o fim da requisição.
*/
app.use((req, res, next) => {
  const start = process.hrtime.bigint(); // Marca o início em nanossegundos
  // Quando a resposta terminar, calcula o tempo total de execução
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000; // Converte para milissegundos;
    // Cria um log estruturado em formato JSON com informações da requisição
    // O PM2 captura automaticamente o console.log e exibe no "pm2 logs"
    console.log(
      JSON.stringify({
        level: "info",
        message: "request:finish",
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs: Number(durationMs.toFixed(2)), // Tempo de resposta com duas casas decimais
      })
    );
  });
  next(); // Continua o fluxo para o próximo middleware ou rota
});
// Define as rotas principais da API
app.use(routes);
/**
* Middleware de tratamento genérico de erros.
* Captura exceções lançadas nas rotas e evita exibir detalhes técnicos ao
usuário.
* Em vez disso, registra o erro completo no console (com stack trace) e envia
* uma resposta genérica ao cliente, preservando a segurança da aplicação.
*/
app.use((err, req, res, next) => {
  console.error(
    JSON.stringify({
      level: "error",
      message: "request:error",
      name: err.name,
      stack: err.stack, // Pilha de execução do erro
    })
  );
  // Retorna resposta padronizada (sem detalhes internos)
  res.status(500).json({ error: "Internal Server Error" });
});
module.exports = app;
