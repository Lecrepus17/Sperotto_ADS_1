import { useState, useEffect } from "react";
import * as eventService from "../services/eventService";
import * as volunteerService from "../services/volunteerService";

export default function Dashboard() {
  // Estados para listar os dados
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega todos os dados do painel
  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, volunteersRes] = await Promise.all([
        eventService.getAllEvents(),
        volunteerService.getAllVolunteers(),
      ]);
      setEvents(eventsRes.data);
      setVolunteers(volunteersRes.data);
    } catch (error) {
      console.error("Falha ao carregar dados do Dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Carregando painel...</p>;

  return (
    <>
      <h1>Painel de Visualização</h1>

      {/* ======================= */}
      {/* SEÇÃO DE EVENTOS (LISTAR) */}
      {/* ======================= */}
      <section className="card">
        <h2>Eventos Cadastrados</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((event) => (
            <li
              key={event.id}
              style={{
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {event.title} ({new Date(event.date).toLocaleDateString()})
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================= */}
      {/* SEÇÃO DE VOLUNTÁRIOS (LISTAR) */}
      {/* ============================= */}
      <section className="card" style={{ marginTop: "20px" }}>
        <h2>Voluntários Inscritos</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {volunteers.map((vol) => (
            <li
              key={vol.id}
              style={{
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {vol.name} ({vol.email})
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}