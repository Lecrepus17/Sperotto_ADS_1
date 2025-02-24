import { createContext, useState } from "react";
import { temaClaro, temaEscuro } from "./theme";
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [temaAtual, setTemaAtual] = useState(temaClaro);
  const alternarTema = () => {
    setTemaAtual(temaAtual === temaClaro ? temaEscuro : temaClaro);
  };
  return (
    <ThemeContext.Provider value={{ temaAtual, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};
