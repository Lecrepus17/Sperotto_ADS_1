import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null);
  const [timeoutError, setTimeoutError] = useState(false);
  useEffect(() => {
    const fetchUsuarios = async () => {
      // Tenta obter os usuários do Local Storage
      const localData = localStorage.getItem("usuarios");
      if (localData) {
        setUsuarios(JSON.parse(localData)); // Carrega dados do Local Storage
        setLoading(false); // Define carregamento como falso
        return; // Sai da função
      }
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
          { timeout: 3000 }
        );
        setUsuarios(response.data);
        localStorage.setItem("usuarios", JSON.stringify(response.data)); // Armazena dados no Local Storage
      } catch (error) {
        if (error.code === "ECONNABORTED") {
          // Erro de timeout
          setTimeoutError(true);
        } else {
          // Outros erros
          console.error("Erro ao carregar usuários:", error);
          setError("Erro ao carregar usuários.");
        }
      } finally {
        setLoading(false); // Atualiza o estado de carregamento para false
      }
    };
    fetchUsuarios();
  }, []);
  // Renderiza o indicador de carregamento
  return (
    <ul>
      <h1>Lista de Usuários</h1>
      {loading && <div className="spinner">Carregando...</div>}
      {error && (
        <p className="error">
          Ocorreu um problema ao carregar os dados. Por favor, tente novamente
          mais tarde.
        </p>
      )}
      {timeoutError && (
        <p>O carregamento dos usuários demorou demais. Tente novamente.</p>
      )}
      {usuarios.length === 0 && <p>Nenhum usuário encontrado.</p>}
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  );
}
export default App;
