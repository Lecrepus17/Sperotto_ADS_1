import { http } from "../api/http";

// Todas as rotas são protegidas para Admin
export const getAllVolunteers = () => http.get("/volunteers");

export const createVolunteer = (volunteerData) =>
  http.post("/volunteers", volunteerData);

export const updateVolunteer = (volunteerData) =>
  http.put("/volunteers", volunteerData);

export const deleteVolunteer = (id) =>
  http.delete("/volunteers", { data: { id } });
