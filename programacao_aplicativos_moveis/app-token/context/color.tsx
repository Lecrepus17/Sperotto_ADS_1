import { createContext, useContext, useState, ReactNode } from "react";

interface ColorContextData {
  colorX: string;
  colorO: string;
  setColorX: (color: string) => void;
  setColorO: (color: string) => void;
}

const Context = createContext<ColorContextData>({} as ColorContextData);

export function useColor() {
  return useContext(Context);
}

export function ColorProvider({ children }: { children: ReactNode }) {
  const [colorX, setColorX] = useState("#fff");
  const [colorO, setColorO] = useState("#fff");


  return (
    <Context.Provider
      value={{
        colorX,
        colorO,
        setColorX,
        setColorO,
      }}
    >
      {children}
    </Context.Provider>
  );
}