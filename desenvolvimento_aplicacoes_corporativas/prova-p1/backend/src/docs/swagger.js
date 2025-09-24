module.exports = {
  openapi: "3.0.0",
  info: {
    title: "API Voluntariado",
    version: "1.0.0",
    description: "Documentação da API com Swagger",
  },
  paths: {
    "/events": {
      get: {
        summary: "Lista eventos",
        responses: { 200: { description: "Sucesso" } },
      },
      post: {
        summary: "Cria evento (admin)",
        responses: { 201: { description: "Criado" } },
      },
    },
    "/auth/login": {
      post: {
        summary: "Login",
        responses: { 200: { description: "Token JWT" } },
      },
    },
  },
};
