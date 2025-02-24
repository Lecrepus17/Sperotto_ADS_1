import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import "./App.css"; // Estilos tradicionais ou CSS Modules
function App() {
  const { temaAtual, alternarTema } = useContext(ThemeContext);
  return (
    <div
      style={{
        backgroundColor: temaAtual.background,
        color: temaAtual.color,
        minHeight: "100vh",
      }}
    >
      <h1>Aplicação com Temas e Context API</h1>
      <button
        style={{
          backgroundColor: temaAtual.background,
          color: temaAtual.color,
        }}
        onClick={alternarTema}
      >
        Alternar Tema
      </button>
    </div>
  );
}
export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
