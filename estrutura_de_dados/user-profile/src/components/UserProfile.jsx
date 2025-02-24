import { useState } from "react";
import UserDetails from "./UserDetails";
function UserProfile() {
  const [age, setAge] = useState(25); // Idade do usuário
  const [title, setTitle] = useState("Perfil do Usuário"); // Título da página
  // Função para alterar a idade
  const incrementAge = () => {
    setAge(age + 1);
  };
  // Função para alterar o título da página
  const updateTitle = () => {
    setTitle(`Perfil Atualizado: ${new Date().toLocaleTimeString()}`);
  };
  return (
    <div>
      <h1>{title}</h1>
      {/* Botão para alterar a idade */}
      <button onClick={incrementAge}>Aumentar Idade</button>
      {/* Botão para atualizar o título */}
      <button onClick={updateTitle}>Atualizar Título</button>
      {/* Componente filho que exibe os detalhes do usuário */}
      <UserDetails name="João Silva" age={age} />
    </div>
  );
}
export default UserProfile;
