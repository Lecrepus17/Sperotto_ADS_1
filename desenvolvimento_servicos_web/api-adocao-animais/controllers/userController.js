const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  const user = new User({ nome, email, senha: hash });
  await user.save();
  res.json(user);
};
const accessTokenSecret = 'youraccesstokensecret';

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: user.id }, accessTokenSecret);
  res.json({ token });
};
