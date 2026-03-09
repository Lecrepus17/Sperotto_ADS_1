import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextData {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

const Context = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  return useContext(Context);
}

interface AuthProviderProps {
  children: ReactNode; // Tipagem correta para componentes filhos no React
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  
  const login = () => setIsLogged(true);
  const logout = () => setIsLogged(false);

  return (
    <Context.Provider value={{ isLogged, login, logout }}>
      {children}
    </Context.Provider>
  );
}