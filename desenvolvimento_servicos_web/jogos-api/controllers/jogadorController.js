const Jogador = require("../models/Jogador");
// Cria um novo jogador
exports.criarJogador = async (req, res) => {
  try {
    const jogador = new Jogador(req.body);
    await jogador.save();
    res.status(201).json(jogador);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar jogador", err });
  }
};
// Lista todos os jogadores com dados populados do jogador
exports.listarJogadores = async (req, res) => {
  try {
    const jogadores = await Jogador.find();
    res.status(200).json(jogadores);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar jogadores", err });
  }
};