import { useEffect, useState } from "react";
import api from "../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h1>Eventos</h1>
      <ul>
        {events.map((ev) => (
          <li key={ev.id}>{ev.title} - {ev.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
