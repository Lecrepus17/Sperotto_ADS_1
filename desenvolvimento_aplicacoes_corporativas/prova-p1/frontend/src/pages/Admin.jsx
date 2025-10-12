import { useState, useEffect } from "react";
import * as eventService from "../services/eventService";
import * as volunteerService from "../services/volunteerService";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

export default function Admin() {
  // Estados para listar os dados
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para o formulário de INCLUSÃO
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    email: "",
    event_id: "",
  });

  // Estados para o formulário de ALTERAÇÃO
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

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
      console.error("Falha ao carregar dados do admin", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- LÓGICA PARA INCLUSÃO ---
  const handleNewEventChange = (e) =>
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  const handleNewVolunteerChange = (e) =>
    setNewVolunteer({ ...newVolunteer, [e.target.name]: e.target.value });

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    await eventService.createEvent(newEvent);
    setNewEvent({ title: "", description: "", date: "" }); // Limpa o form
    fetchData();
  };

  const handleCreateVolunteer = async (e) => {
    e.preventDefault();
    await volunteerService.createVolunteer(newVolunteer);
    setNewVolunteer({ name: "", email: "", event_id: "" }); // Limpa o form
    fetchData();
  };

  // --- LÓGICA PARA ALTERAÇÃO ---
  const handleEditEventClick = (event) => {
    const formattedDate = new Date(event.date).toISOString().split("T")[0];
    setEditingEvent({ ...event, date: formattedDate });
  };
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    await eventService.updateEvent(editingEvent);
    setEditingEvent(null);
    fetchData();
  };

  const handleEditVolunteerClick = (volunteer) => {
    setEditingVolunteer(volunteer);
  };
  const handleUpdateVolunteer = async (e) => {
    e.preventDefault();
    await volunteerService.updateVolunteer(editingVolunteer);
    setEditingVolunteer(null);
    fetchData();
  };

  // --- LÓGICA PARA EXCLUSÃO ---
  const handleDeleteEvent = async (id) => {
    if (window.confirm("Confirmar exclusão do evento?")) {
      await eventService.deleteEvent(id);
      fetchData();
    }
  };
  const handleDeleteVolunteer = async (id) => {
    if (window.confirm("Confirmar exclusão do voluntário?")) {
      await volunteerService.deleteVolunteer(id);
      fetchData();
    }
  };

  if (loading) return <p>Carregando painel...</p>;

  return (
    <>
      <h1>Painel Administrativo</h1>

      {/* ======================================= */}
      {/* SEÇÃO DE EVENTOS (INCLUIR/ALTERAR/LISTAR) */}
      {/* ======================================= */}
      <section className="card">
        <h2>Gerenciar Eventos</h2>

        {/* Formulário de INCLUSÃO de Evento */}
        <form
          onSubmit={handleCreateEvent}
          className="form form--inline"
          style={{ marginBottom: "20px" }}
        >
          <FormInput
            name="title"
            label="Título"
            value={newEvent.title}
            onChange={handleNewEventChange}
            placeholder="Nome do Evento"
            required
          />
          <FormInput
            name="description"
            label="Descrição"
            value={newEvent.description}
            onChange={handleNewEventChange}
            placeholder="Detalhes do evento"
            required
          />
          <FormInput
            name="date"
            label="Data"
            type="date"
            value={newEvent.date}
            onChange={handleNewEventChange}
            required
          />
          <Button type="submit">Incluir Novo Evento</Button>
        </form>

        <hr />

        {/* Formulário de ALTERAÇÃO de Evento (só aparece ao clicar em Editar) */}
        {editingEvent && (
          <form
            onSubmit={handleUpdateEvent}
            className="form"
            style={{
              background: "#f0f0f0",
              padding: "15px",
              borderRadius: "8px",
              margin: "20px 0",
            }}
          >
            <h4>Editando Evento: {editingEvent.title}</h4>
            <FormInput
              label="Título"
              value={editingEvent.title}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
            />
            <FormInput
              label="Descrição"
              value={editingEvent.description}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  description: e.target.value,
                })
              }
            />
            <FormInput
              label="Data"
              type="date"
              value={editingEvent.date}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, date: e.target.value })
              }
            />
            <Button type="submit">Salvar Alterações</Button>
            <Button
              onClick={() => setEditingEvent(null)}
              style={{ marginLeft: "10px", background: "#6c757d" }}
            >
              Cancelar
            </Button>
          </form>
        )}

        {/* LISTA de Eventos */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((event) => (
            <li
              key={event.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {event.title} ({new Date(event.date).toLocaleDateString()})
              </span>
              <div>
                <Button
                  onClick={() => handleEditEventClick(event)}
                  style={{ marginRight: "8px" }}
                >
                  Editar
                </Button>
                <Button onClick={() => handleDeleteEvent(event.id)}>
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================= */}
      {/* SEÇÃO DE VOLUNTÁRIOS (INCLUIR/ALTERAR/LISTAR) */}
      {/* ============================================= */}
      <section className="card" style={{ marginTop: "20px" }}>
        <h2>Gerenciar Voluntários</h2>

        {/* Formulário de INCLUSÃO de Voluntário */}
        <form
          onSubmit={handleCreateVolunteer}
          className="form form--inline"
          style={{ marginBottom: "20px" }}
        >
          <FormInput
            name="name"
            label="Nome"
            value={newVolunteer.name}
            onChange={handleNewVolunteerChange}
            placeholder="Nome do Voluntário"
            required
          />
          <FormInput
            name="email"
            label="Email"
            type="email"
            value={newVolunteer.email}
            onChange={handleNewVolunteerChange}
            placeholder="email@exemplo.com"
            required
          />
          <label className="form-group">
            <span className="form-label">Evento</span>
            <select
              name="event_id"
              value={newVolunteer.event_id}
              onChange={handleNewVolunteerChange}
              className="form-input"
              required
            >
              <option value="">Selecione um evento</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit">Incluir Voluntário</Button>
        </form>

        <hr />

        {/* Formulário de ALTERAÇÃO de Voluntário (só aparece ao clicar em Editar) */}
        {editingVolunteer && (
          <form
            onSubmit={handleUpdateVolunteer}
            className="form"
            style={{
              background: "#f0f0f0",
              padding: "15px",
              borderRadius: "8px",
              margin: "20px 0",
            }}
          >
            <h4>Editando Voluntário: {editingVolunteer.name}</h4>
            <FormInput
              label="Nome"
              value={editingVolunteer.name}
              onChange={(e) =>
                setEditingVolunteer({
                  ...editingVolunteer,
                  name: e.target.value,
                })
              }
            />
            <FormInput
              label="Email"
              type="email"
              value={editingVolunteer.email}
              onChange={(e) =>
                setEditingVolunteer({
                  ...editingVolunteer,
                  email: e.target.value,
                })
              }
            />
            <label className="form-group">
              <span className="form-label">Evento</span>
              <select
                value={editingVolunteer.event_id}
                onChange={(e) =>
                  setEditingVolunteer({
                    ...editingVolunteer,
                    event_id: e.target.value,
                  })
                }
                className="form-input"
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit">Salvar Alterações</Button>
            <Button
              onClick={() => setEditingVolunteer(null)}
              style={{ marginLeft: "10px", background: "#6c757d" }}
            >
              Cancelar
            </Button>
          </form>
        )}

        {/* LISTA de Voluntários */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {volunteers.map((vol) => (
            <li
              key={vol.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {vol.name} ({vol.email})
              </span>
              <div>
                <Button
                  onClick={() => handleEditVolunteerClick(vol)}
                  style={{ marginRight: "8px" }}
                >
                  Editar
                </Button>
                <Button onClick={() => handleDeleteVolunteer(vol.id)}>
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
