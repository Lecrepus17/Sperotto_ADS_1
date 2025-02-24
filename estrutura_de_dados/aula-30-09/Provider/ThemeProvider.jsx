import { useState } from "react";
import ThemeContext from "../components/ThemeContext";
function ThemeProvider({ children }) {
  const [tema, setTema] = useState("light"); // Estado para o tema atual
  // Alterna entre tema claro e escuro
  const toggleTheme = () => {
    setTema((prevTema) => (prevTema === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ tema, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
