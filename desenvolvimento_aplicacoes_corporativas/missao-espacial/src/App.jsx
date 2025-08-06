// Importa os hooks useState e useEffect do React
import { useState, useEffect } from "react";
// Componente principal App
function App() {
  // Estado 'missao' com valores iniciais
  const [missao, setMissao] = useState({
    nome: "Apollo 11",
    fase: 1,
    combustivel: 100,
  });
  // Função para avançar a fase da missão
  const avancarFase = () => {
    // Atualiza o estado 'missao', incrementando a fase
    setMissao((prevMissao) => ({
      ...prevMissao, // Mantém os valores anteriores
      fase: prevMissao.fase + 1, // Incrementa a fase
    }));
  };
  // Função para consumir combustível da missão
  const consumirCombustivel = () => {
    // Atualiza o estado 'missao', diminuindo o combustível
    setMissao((prevMissao) => ({
      ...prevMissao, // Mantém os valores anteriores
      combustivel: prevMissao.combustivel - 10, // Subtrai 10 do combustível
    }));
  };
  // useEffect para monitorar mudanças na fase da missão
  useEffect(() => {
    // Exibe no console a fase atual sempre que ela mudar
    console.log(`🚀 Fase atual da missão: ${missao.fase}`);
  }, [missao.fase]); // Dependência: só executa quando 'missao.fase mudar'

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Título do simulador */}
      <h1>🛰 Simulador de Missão Espacial</h1>
      {/* Exibe informações da missão */}
      <p>
        <strong>Nome da Missão:</strong> {missao.nome}
      </p>
      <p>
        <strong>Fase Atual:</strong> {missao.fase}
      </p>
      <p>
        <strong>Combustível:</strong> {missao.combustivel}%
      </p>
      {/* Botões para avançar fase e consumir combustível */}
      <button onClick={avancarFase} style={{ marginRight: "10px" }}>
        Avançar Fase
      </button>
      <button onClick={consumirCombustivel}>Consumir Combustível</button>
    </div>
  );
}
// Exporta o componente
export default App;
