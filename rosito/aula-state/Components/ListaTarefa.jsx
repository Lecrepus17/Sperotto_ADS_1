import { useState } from "react";
function ListaTarefas() {
  const [tarefas, setTarefas] = useState(["Estudar", "Exercitar", "Ler"]);
  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, novaTarefa]); // Adiciona uma nova tarefa ao array
  };
  const removerTarefa = (index) => {
    setTarefas(tarefas.filter((_, i) => i !== index)); // Remove a tarefa pelo índice
  };
  return (
    <div>
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}
            <button onClick={() => removerTarefa(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <button onClick={() => adicionarTarefa("Nova Tarefa")}>
        Adicionar Tarefa
      </button>
    </div>
  );
}
export default ListaTarefas;
