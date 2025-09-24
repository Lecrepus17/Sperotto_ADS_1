import { useState } from "react";
import api from "../services/api";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/events", { title, description, date }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    alert("Evento criado!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
      <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Data" />
      <button type="submit">Criar</button>
    </form>
  );
};

export default Admin;
