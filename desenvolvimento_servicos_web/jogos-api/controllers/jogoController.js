const Jogo = require("../models/Jogo");
// Cria um novo Jogo
exports.criarJogo = async (req, res) => {
  try {
    const jogo = new Jogo(req.body);
    await jogo.save();
    res.status(201).json(jogo);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar jogo", err });
  }
};

// Lista todos os Jogos
exports.listarJogos = async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.status(200).json(jogos);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar jogos", err });
  }
};
// buscar jogo
exports.buscarJogo = async (req, res) => {
  const { jogoId } = req.params;
  try {
    const jogo = await Jogo.findById(jogoId);
    if (!jogo) {
      return res.status(404).json({ message: "Jogo não encontrado" });
    }
    res.status(200).json(jogo);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar jogos", err });
  }
};
// Atualiza um jogo pelo ID
exports.atualizarJogo = async (req, res) => {
  const { jogoId } = req.params;
  try {
    const jogoAtualizado = await Jogo.findByIdAndUpdate(jogoId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!jogoAtualizado) {
      return res.status(404).json({ message: "Jogo não encontrado para atualizar" });
    }
    res.status(200).json(jogoAtualizado);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar jogo", error: err.message });
  }
};

// Deleta um jogo pelo ID
exports.deletarJogo = async (req, res) => {
  const { jogoId } = req.params;
  try {
    const jogoDeletado = await Jogo.findByIdAndDelete(jogoId);
    if (!jogoDeletado) {
      return res.status(404).json({ message: "Jogo não encontrado para deletar" });
    }
    res.status(200).json({ message: "Jogo deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar jogo", error: err.message });
  }
};