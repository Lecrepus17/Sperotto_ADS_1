const EventModel = require("../models/eventModel");

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

  static async alterEvent(event) {
    if (!event.id) {
      throw new Error("Não mandado id do evento.");
    }
    return await EventModel.alter(event);
  }

  static async deleteEvent(event) {
    if (!event.id) {
      throw new Error("Não mandado id do evento.");
    }
    return await EventModel.delete(event);
  }
}

module.exports = EventService;
