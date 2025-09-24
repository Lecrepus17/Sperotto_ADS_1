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
      [title, description, date],
    );
    return { id: result.insertId, ...event };
  }
}

module.exports = EventModel;
