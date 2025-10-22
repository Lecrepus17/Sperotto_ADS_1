const { enviarEmail } = require("./emailService");
function cadastrarUsuario(nome, email) {
  const usuario = { id: 1, nome, email };
  enviarEmail(usuario);
  return usuario;
}
module.exports = { cadastrarUsuario };
