const EventModel = require("../models/EventModel");

class EventService {
  static async listEvents() {
    return await EventModel.getAll();
  }

  static async addEvent(event) {
    if (!event.title || !event.date) {
      throw new Error("Título e data são obrigatórios.");
    }
    return await EventModel.create(event);
  }
}

module.exports = EventService;
