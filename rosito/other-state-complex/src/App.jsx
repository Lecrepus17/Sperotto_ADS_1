import React, { useEffect, useState } from "react";
import "./App.css";
const arrayUsers = [
  {
    id: 1,
    name: "João Silva",
    age: 1,
  },
  {
    id: 2,
    name: "Maria Souza",
    age: 15,
  },
  {
    id: 3,
    name: "Carlos Pereira",
    age: 35,
  },
];
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers(arrayUsers);
      setLoading(false);
    }, 1000);
  }, []);

  function handleAddLocation() {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.location === undefined ? { ...user, location: "Brasil" } : user
      )
    );
  }

  function handleIncreaseAge() {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, age: user.age + 1 }))
    );
  }

  if (loading) {
    return (
      <>
        <h1>Lista de Usuários</h1>
        <p>Carregando usuários...</p>
      </>
    );
  }

  return (
    <>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.id} - {user.name} - {user.age} anos
            {user.location && " - " + user.location}
          </li>
        ))}
      </ul>
      <button onClick={handleIncreaseAge}>Aumentar idade</button>
      <button onClick={handleAddLocation}>Adicionar localização</button>
    </>
  );
}

export default App;