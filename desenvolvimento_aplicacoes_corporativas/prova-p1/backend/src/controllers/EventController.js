const EventService = require("../services/EventService");

class EventController {
  static async getEvents(req, res) {
    try {
      const events = await EventService.listEvents();
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createEvent(req, res) {
    try {
      const newEvent = await EventService.addEvent(req.body);
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EventController;
