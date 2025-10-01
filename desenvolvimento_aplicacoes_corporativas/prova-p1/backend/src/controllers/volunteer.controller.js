const VolunteerService = require("../services/VolunteerService");

// Controlador responsável por lidar com rotas protegidas por autenticação JWT
class VolunteersController {
  // Método que responde ao painel do usuário autenticado
  static dashboard(req, res) {
    try {
      // Responde com uma mensagem usando o e-mail do usuário autenticado
      return res.status(200).json({
        message: `Bem-vindo ao painel,
           ${req.user.email}`,
      });
    } catch (error) {
      // Em caso de erro inesperado, retorna erro interno do servidor
      return res
        .status(500)
        .json({ message: "Erro ao acessar o painel", error: error.message });
    }
  }
  // Método exclusivo para usuários com permissão de admin
  static adminOnly(req, res) {
    try {
      // Responde com uma mensagem personalizada usando o e-mail do administrador autenticado
      return res.status(200).json({
        message: `Bem-vindo à área admin,
           ${req.user.email}`,
      });
    } catch (error) {
      // Em caso de erro inesperado, retorna erro interno do servidor
      return res.status(500).json({
        message: "Erro ao acessar a área admin",
        error: error.message,
      });
    }
  }

  // Método estático que trata o cadastro de um novo usuário
  static async newVolunteer(req, res) {
    try {
      // Chama o serviço para registrar o usuário, passando os dados da requisição
      const result = await VolunteerService.addVolunteer(req.body);
      // Retorna status 201 (Criado) com os dados retornados pelo serviço
      return res.status(201).json(result);
    } catch (error) {
      // Em caso de erro (ex: usuário já existe), retorna status 409 (Conflito) com a mensagem do erro
      return res.status(409).json({ message: error.message });
    }
  }

  static async getVolunteers(req, res) {
    try {
      const volunteers = await VolunteerService.listVolunteers();
      res.json(volunteers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateVolunteer(req, res) {
    try {
      const volunteer = await VolunteerService.alterVolunteer(req.body);
      res.status(201).json(volunteer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  static async deleteVolunteer(req, res) {
    try {
      const volunteer = await VolunteerService.deleteVolunteer(req.body);
      res.status(201).json(volunteer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
// Exporta o controlador para ser utilizado nas rotas protegidas
module.exports = VolunteersController;
