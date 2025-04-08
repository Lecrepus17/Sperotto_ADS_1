const Pontuacao = require("../models/Pontuacao");

// Cria uma nova pontuação
exports.criarPontuacao = async (req, res) => {
  try {
    const novaPontuacao = new Pontuacao(req.body);

    // Verificação de existência de jogo e Jogador:
    const Jogo = require("../models/Jogo");
    const Jogador = require("../models/Jogador");
    const jogoExiste = await Jogo.findById(req.body.jogo);
    const jogadorExiste = await Jogador.findById(req.body.jogador);
    if (!jogoExiste || !jogadorExiste) {
      return res.status(400).json({ message: "Jogo ou Jogador não encontrado" });
    }

    await novaPontuacao.save();
    res.status(201).json(novaPontuacao);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar pontuação", error: err.message });
  }
};

// Lista os 10 jogadores com maiores pontuações para um jogo específico
exports.listarRanking = async (req, res) => {
  const { jogoId } = req.params;

  if (!jogoId) {
    return res.status(400).json({ message: "Parâmetro 'jogoId' é obrigatório" });
  }

  try {
    const ranking = await Pontuacao.find({ jogo: jogoId })
      .sort({ valor: -1 })
      .limit(10);

    res.status(200).json(ranking);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar ranking", error: err.message });
  }
};

// Retorna os 3 jogos com maior número de pontuações registradas
exports.listarPopulares = async (req, res) => {
  try {
    const populares = await Pontuacao.aggregate([
      {
        $group: {
          _id: "$jogo",
          totalPontuacoes: { $sum: 1 }
        }
      },
      {
        $sort: { totalPontuacoes: -1 }
      },
      {
        $limit: 3
      },
      {
        $lookup: {
          from: "jogos", // nome da coleção no MongoDB (atenção ao plural minúsculo)
          localField: "_id",
          foreignField: "_id",
          as: "jogo"
        }
      },
      {
        $unwind: "$jogo"
      }
    ]);

    res.status(200).json(populares);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar jogos populares", error: err.message });
  }
};
