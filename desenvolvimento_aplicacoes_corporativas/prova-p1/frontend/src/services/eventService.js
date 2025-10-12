import { http } from "../api/http";

// Rota Pública
export const getAllEvents = () => http.get("/events");

// Rotas de Admin (o interceptor em http.js já cuida do token)
export const createEvent = (eventData) => http.post("/events", eventData);

export const updateEvent = (eventData) => http.put("/events", eventData);

export const deleteEvent = (id) => http.delete("/events", { data: { id } });
