import { useState } from "react";
function App() {
  const [ativo, setAtivo] = useState(false);
  const [hover, setHover] = useState(false); // Estado para hover
  const estiloContainer = {
    backgroundColor: ativo ? "lightgreen" : "lightblue",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  };
  const estiloTitulo = {
    color: ativo ? "darkgreen" : "darkblue",
    fontSize: "24px",
    marginBottom: "10px",
  };
  const estiloBotao = {
    backgroundColor: hover
      ? ativo
        ? "darkgreen"
        : "darkgray"
      : ativo
      ? "green"
      : "gray", // Efeito hover
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };
  const alternarAtivo = () => {
    setAtivo(!ativo);
  };
  return (
    <div style={estiloContainer}>
      <h1 style={estiloTitulo}>Clique no Botão</h1>
      <button
        style={estiloBotao}
        onClick={alternarAtivo}
        onMouseEnter={() => setHover(true)} // Detecta mouse sobre o botão
        onMouseLeave={() => setHover(false)} // Detecta quando o mouse sai do
        botão
      >
        {ativo ? "Ativo" : "Inativo"}
      </button>
    </div>
  );
}
export default App;
