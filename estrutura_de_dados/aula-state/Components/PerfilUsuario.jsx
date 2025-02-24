import { useState } from "react";
function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    nome: "João",
    idade: 25,
    cidade: "São Paulo",
  });
  const atualizarCidade = () => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario, // Preserva as outras propriedades do estado
      cidade: "Rio de Janeiro", // Atualiza apenas a cidade
    }));
  };
  return (
    <div>
      <p>Nome: {usuario.nome}</p>
      <p>Idade: {usuario.idade}</p>
      <p>Cidade: {usuario.cidade}</p>
      <button onClick={atualizarCidade}>Mudar Cidade</button>
    </div>
  );
}
export default PerfilUsuario;
