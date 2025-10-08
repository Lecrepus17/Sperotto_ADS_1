const db = require("../config/db");

/**
 * @typedef {object} UserPayload
 * @property {string} email - O email do usuário.
 * @property {string} password - A senha (hash) do usuário.
 * @property {string} [role='user'] - A permissão do usuário (ex: 'user', 'admin').
 */

/**
 * @typedef {UserPayload} User
 * @property {number} id - O ID único do usuário.
 */

/**
 * @class UserModel
 * @description Classe responsável pelas operações de banco de dados para usuários.
 */
class UserModel {
  /**
   * @description Busca um usuário no banco de dados pelo seu email.
   * @static
   * @async
   * @param {string} email - O email do usuário a ser procurado.
   * @returns {Promise<User|undefined>} Uma Promise que resolve para o objeto do usuário encontrado ou undefined se nenhum usuário for encontrado.
   * @throws {Error} Lança um erro se a consulta ao banco de dados falhar.
   */
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  /**
   * @description Cria um novo usuário no banco de dados.
   * @static
   * @async
   * @param {UserPayload} user - O objeto contendo os dados do usuário a ser criado.
   * @returns {Promise<number>} Uma Promise que resolve para o ID do usuário recém-criado.
   * @throws {Error} Lança um erro se a inserção no banco de dados falhar.
   */
  static async create(user) {
    const { email, password, role } = user;
    const [result] = await db.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, password, role]
    );
    return result.insertId;
  }
}

module.exports = UserModel;
