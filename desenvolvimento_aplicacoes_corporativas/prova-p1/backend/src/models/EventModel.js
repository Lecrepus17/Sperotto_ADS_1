const db = require("../config/db");

/**
 * @typedef {object} EventPayload
 * @property {string} title - O título do evento.
 * @property {string} description - A descrição detalhada do evento.
 * @property {string | Date} date - A data do evento.
 */

/**
 * @typedef {EventPayload} Event
 * @property {number} id - O ID único do evento.
 */

/**
 * @class EventModel
 * @description Classe responsável pelas operações de banco de dados (CRUD) para eventos.
 */
class EventModel {
  /**
   * @description Busca todos os eventos no banco de dados.
   * @static
   * @async
   * @returns {Promise<Array<Event>>} Uma Promise que resolve para um array de objetos de evento.
   * @throws {Error} Lança um erro se a consulta ao banco de dados falhar.
   */
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM events");
    return rows;
  }

  /**
   * @description Cria um novo evento no banco de dados.
   * @static
   * @async
   * @param {EventPayload} event - O objeto contendo os dados do evento a ser criado.
   * @returns {Promise<Event>} Uma Promise que resolve para o objeto do evento recém-criado, incluindo seu novo ID.
   * @throws {Error} Lança um erro se a inserção no banco de dados falhar.
   */
  static async create(event) {
    const { title, description, date } = event;
    const [result] = await db.query(
      "INSERT INTO events (title, description, date) VALUES (?, ?, ?)",
      [title, description, date]
    );
    return { id: result.insertId, ...event };
  }

  /**
   * @description Altera um evento existente no banco de dados com base no ID.
   * @static
   * @async
   * @param {Event} event - O objeto do evento a ser alterado, incluindo o ID.
   * @returns {Promise<Event>} Uma Promise que resolve para o objeto do evento com os dados atualizados.
   * @throws {Error} Lança um erro se o evento com o ID especificado não for encontrado.
   */
  static async alter(event) {
    const { id, title, description, date } = event;

    // Atualiza o evento existente
    const [result] = await db.query(
      "UPDATE events SET title = ?, description = ?, date = ? WHERE id = ?",
      [title, description, date, id]
    );

    // Se nenhum registro foi alterado, significa que o id não existe
    if (result.affectedRows === 0) {
      throw new Error(`Evento com id ${id} não encontrado.`);
    }

    return { id, title, description, date };
  }

  /**
   * @description Deleta um evento do banco de dados com base no ID.
   * @static
   * @async
   * @param {object} event - O objeto contendo o ID do evento a ser deletado.
   * @param {number} event.id - O ID do evento.
   * @returns {Promise<{message: string}>} Uma Promise que resolve para um objeto com uma mensagem de sucesso.
   * @throws {Error} Lança um erro se o evento com o ID especificado não for encontrado.
   */
  static async delete(event) {
    const { id } = event;

    // Deleta o evento pelo id
    const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);

    // Se nenhum registro foi deletado, significa que o id não existe
    if (result.affectedRows === 0) {
      throw new Error(`Evento com id ${id} não encontrado.`);
    }

    return { message: `Evento com id ${id} deletado com sucesso.` };
  }
}

module.exports = EventModel;
