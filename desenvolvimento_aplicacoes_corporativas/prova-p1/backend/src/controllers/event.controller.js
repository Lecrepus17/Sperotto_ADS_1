const EventService = require("../services/eventService");

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

  static async updateEvent(req, res) {
    try {
      const event = await EventService.alterEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteEvent(req, res) {
    try {
      const event = await EventService.deleteEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EventController;
