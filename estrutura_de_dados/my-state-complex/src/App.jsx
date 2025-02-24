import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jogadores, setJogadores] = useState([
    {
      id: 1,
      nome: "Jogador 1",
      nivel: 1,
      pontuacao: 0,
    },
  ]);

  // Adiciona um novo jogador ao array
  function adicionaJogador() {
    setJogadores((prevJogadores) => [
      ...prevJogadores,
      {
        id: prevJogadores.length + 1, // Cria um novo id baseado no tamanho do array
        nome: `Jogador ${prevJogadores.length + 1}`,
        nivel: 1,
        pontuacao: 0,
      },
    ]);
  }

  // Aumenta a pontuação do jogador especificado
  function aumentarPontuacao(id) {
    setJogadores((prevJogadores) =>
      prevJogadores.map((jogador) =>
        jogador.id === id
          ? { ...jogador, pontuacao: jogador.pontuacao + 10 }
          : jogador
      )
    );
  }

  // Sobe o nível do jogador especificado
  function subirNivel(id) {
    setJogadores((prevJogadores) =>
      prevJogadores.map((jogador) =>
        jogador.id === id ? { ...jogador, nivel: jogador.nivel + 1 } : jogador
      )
    );
  }

  useEffect(() => {
    console.log("Estado dos jogadores atualizado:", jogadores);
  }, [jogadores]);

  return (
    <div>
      <h1>Perfil dos Jogadores</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nível</th>
            <th>Pontuação</th>
            <th>Funções</th>
          </tr>
        </thead>
        <tbody>
          {jogadores.length > 0 ? (
            jogadores.map((j) => (
              <tr key={j.id}>
                <td>{j.nome}</td>
                <td>{j.nivel}</td>
                <td>{j.pontuacao}</td>
                <td>
                  <button onClick={() => aumentarPontuacao(j.id)}>
                    Aumentar Pontuação
                  </button>
                  |
                  <button onClick={() => subirNivel(j.id)}>
                    Subir de Nível
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum jogador encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={adicionaJogador}>Adicionar Jogador</button>
    </div>
  );
}

export default App;
