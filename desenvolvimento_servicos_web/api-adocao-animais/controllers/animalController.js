const Animal = require('../models/Animal');
const User = require('../models/User');

exports.cadastrar = async (req, res) => {
  const animal = await Animal.create(req.body);
  res.json(animal);
};

exports.adotar = async (req, res) => {
  const { id } = req.body
  const animal = await Animal.findByPk(id);
  if (!animal) {
    return res.status(400).json({ mensagem: 'Animal não encontrado' });
  }
  if (animal.status === 'adotado') {
    return res.status(400).json({ mensagem: 'Animal não disponível' });
  }
  
  animal.status = 'adotado';
  animal.userId = req.user.id;
  if (animal.userId === null) {
    return res.status(400).json({ mensagem: 'Adotante é obrigatório' });
  }
  await animal.save();
  res.json(animal);
};

exports.adotados = async (req, res) => {
  const adotados = await Animal.findAll({
    where: { status: 'adotado' },
    include: [{ model: User, as: 'adotante', attributes: ['nome', 'email'] }]
  });
  res.json(adotados);
};
