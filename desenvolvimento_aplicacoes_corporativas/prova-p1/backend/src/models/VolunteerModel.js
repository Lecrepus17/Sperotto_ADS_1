const db = require("../config/db");

/**
 * @typedef {object} VolunteerPayload
 * @property {string} name - O nome do voluntário.
 * @property {string} email - O email do voluntário.
 * @property {number} event_id - O ID do evento ao qual o voluntário está associado.
 */

/**
 * @typedef {VolunteerPayload} Volunteer
 * @property {number} id - O ID único do voluntário.
 */

/**
 * @class VolunteerModel
 * @description Classe para gerenciar as operações de banco de dados (CRUD) para voluntários.
 */
class VolunteerModel {
  /**
   * @description Busca todos os voluntários no banco de dados.
   * @static
   * @async
   * @returns {Promise<Array<Volunteer>>} Uma Promise que resolve para um array de objetos de voluntário.
   * @throws {Error} Lança um erro se a consulta ao banco de dados falhar.
   */
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM volunteers");
    return rows;
  }

  /**
   * @description Cria um novo voluntário no banco de dados.
   * @static
   * @async
   * @param {VolunteerPayload} volunteer - O objeto com os dados do voluntário a ser criado.
   * @returns {Promise<Volunteer>} Uma Promise que resolve para o objeto do voluntário recém-criado, incluindo seu novo ID.
   * @throws {Error} Lança um erro se a inserção no banco de dados falhar.
   */
  static async create(volunteer) {
    const { name, email, event_id } = volunteer;
    const [result] = await db.query(
      "INSERT INTO volunteers (name, email, event_id) VALUES (?, ?, ?)",
      [name, email, event_id]
    );
    return { id: result.insertId, ...volunteer };
  }

  /**
   * @description Altera um voluntário existente com base no seu ID.
   * @static
   * @async
   * @param {Volunteer} volunteer - O objeto do voluntário a ser alterado, incluindo o ID.
   * @returns {Promise<Volunteer>} Uma Promise que resolve para o objeto do voluntário com os dados atualizados.
   * @throws {Error} Lança um erro se o voluntário com o ID especificado não for encontrado.
   */
  static async alter(volunteer) {
    const { id, name, email, event_id } = volunteer;

    // Atualiza o voluntário existente
    const [result] = await db.query(
      "UPDATE volunteers SET name = ?, email = ?, event_id = ? WHERE id = ?",
      [name, email, event_id, id]
    );

    // Se nenhum registro foi alterado, significa que o id não existe
    if (result.affectedRows === 0) {
      throw new Error(`Voluntário com id ${id} não encontrado.`);
    }

    return { id, name, email, event_id };
  }

  /**
   * @description Deleta um voluntário do banco de dados com base no seu ID.
   * @static
   * @async
   * @param {object} volunteer - O objeto contendo o ID do voluntário.
   * @param {number} volunteer.id - O ID do voluntário a ser deletado.
   * @returns {Promise<{message: string}>} Uma Promise que resolve para um objeto com uma mensagem de sucesso.
   * @throws {Error} Lança um erro se o voluntário com o ID especificado não for encontrado.
   */
  static async delete(volunteer) {
    const { id } = volunteer;

    // Deleta o voluntário pelo id
    const [result] = await db.query("DELETE FROM volunteers WHERE id = ?", [id]);

    // Se nenhum registro foi deletado, significa que o id não existe
    if (result.affectedRows === 0) {
      throw new Error(`Voluntário com id ${id} não encontrado.`);
    }

    return { message: `Voluntário com id ${id} deletado com sucesso.` };
  }
}

module.exports = VolunteerModel;