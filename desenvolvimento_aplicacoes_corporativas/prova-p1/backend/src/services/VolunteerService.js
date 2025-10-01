const VolunteerModel = require("../models/VolunteerModel");

class VolunteerService {
  static async listVolunteers() {
    return await VolunteerModel.getAll();
  }

  static async addVolunteer(volunteer) {
    if (!volunteer.email || !volunteer.name || !volunteer.event_id) {
      throw new Error("Título e data são obrigatórios.");
    }
    return await VolunteerModel.create(volunteer);
  }

  
  static async alterVolunteer(vonlunteer) {
    if (!vonlunteer.id) {
      throw new Error("Não mandado id do voluntário.");
    }
    return await VolunteerModel.alter(vonlunteer);
  }

  static async deleteVolunteer(vonlunteer) {
    if (!vonlunteer.id) {
      throw new Error("Não mandado id do voluntário.");
    }
    return await VolunteerModel.delete(vonlunteer);
  }
}

module.exports = VolunteerService;
