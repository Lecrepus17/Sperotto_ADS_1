const UserService = require("../services/userService");

class AuthController {
  // Método estático que trata o cadastro de um novo usuário
  static async register(req, res) {
    try {
      // Chama o serviço para registrar o usuário, passando os dados da requisição
      const result = await UserService.registerUser(req.body);
      // Retorna status 201 (Criado) com os dados retornados pelo serviço
      return res.status(201).json(result);
    } catch (error) {
      // Em caso de erro (ex: usuário já existe), retorna status 409 (Conflito) com a mensagem do erro
      return res.status(409).json({ message: error.message });
    }
  }
  static async login(req, res) {
    try {
      // Chama o serviço para autenticar o usuário, passando os dados da requisição
      const result = await UserService.loginUser(req.body);
      // Retorna status 200 (OK) com o token JWT
      return res.status(200).json(result); // envia { token, user }
    } catch (error) {
      // Define o status apropriado com base na mensagem de erro
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401 // Não autorizado
          : 500; // Erro interno do servidor
      // Retorna o status definido com a mensagem do erro
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
