const db = require("../config/db");

class VolunteerModel {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM volunteers");
    return rows;
  }

  static async create(volunteer) {
    const { name, email, event_id } = volunteer;
    const [result] = await db.query(
      "INSERT INTO volunteers (name, email, event_id) VALUES (?, ?, ?)",
      [name, email, event_id],
    );
    return { id: result.insertId, ...volunteer };
  }

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
