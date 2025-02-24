import "./App.css";
import PessoasFiltradas from "./components/PessoasFiltradas";

function App() {
  const nomes = [
    "João Silva",
    "Maria Santos",
    "Pedro Almeida",
    "Ana Costa",
    "Carlos Ribeiro",
    "Beatriz Oliveira",
    "Alberto Souza",
    "Lucas Pereira",
    "Juliana Ferreira",
    "Ricardo Gomes"
];

  return (
    <div>
      <PessoasFiltradas pessoas={nomes} />
    </div>
  );
}

export default App;
