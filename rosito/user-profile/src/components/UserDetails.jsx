import React from "react";
// Componente memorizado usando React.memo
const UserDetails = React.memo(({ name, age }) => {
  console.log("Renderizando UserDetails..."); // Log para verificar quando é renderizado
  return (
    <div>
      <h3>Detalhes do Usuário:</h3>
      <p>Nome: {name}</p>
      <p>Idade: {age}</p>
    </div>
  );
});
export default UserDetails;
