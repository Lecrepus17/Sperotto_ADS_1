import { createContext, useContext, useState, ReactNode } from "react";
import { users, User } from "../data/users";

interface AuthContextData {
  isLogged: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const Context = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  return useContext(Context);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setIsLogged(true);
      setUser(found);
      return true;
    }
    setIsLogged(false);
    setUser(null);
    return false;
  };

  const logout = () => {
    setIsLogged(false);
    setUser(null);
  };

  return (
    <Context.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </Context.Provider>
  );
}