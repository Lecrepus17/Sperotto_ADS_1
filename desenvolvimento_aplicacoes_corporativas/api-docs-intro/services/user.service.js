/**
 * Serviço de usuários: regras de negócio relacionadas a usuário.
 * @module services/UserService
 */
/**
 * Valida o nome do usuário.
 * @param {string} name - Nome informado
 * @returns {boolean} true se válido
 * @throws {Error} Se name não for string
 */
function isValidName(name) {
  if (typeof name !== "string") throw new Error("name deve ser string");
  return name.trim().length >= 2;
}
module.exports = { isValidName };
