const db = require("../config/db");

class EventModel {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM events");
    return rows;
  }

  static async create(event) {
    const { title, description, date } = event;
    const [result] = await db.query(
      "INSERT INTO events (title, description, date) VALUES (?, ?, ?)",
      [title, description, date]
    );
    return { id: result.insertId, ...event };
  }

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
