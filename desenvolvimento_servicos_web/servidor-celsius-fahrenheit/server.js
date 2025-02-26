const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/temp") {
    const celcius = parseFloat(parsedUrl.query.grausCelcius);
    if (isNaN(celcius)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ erro: "Parâmetros inválidos" }));
      return;
    }
    const fahrenheit = (celcius * 9 / 5) + 32;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ fahrenheit }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Rota não encontrada");
  }
});
server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});