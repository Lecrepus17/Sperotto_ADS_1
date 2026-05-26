import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { users, User } from "../data/users";

interface AuthContextData {
  isLogged: boolean;
  user: User | null;
  // A função agora é assíncrona (Promise) por causa do AsyncStorage
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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

  // 1. Verifica se há um usuário salvo assim que o app inicia
  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@NoteApp:user");
      
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setIsLogged(true);
      }
    }
    
    loadStorageData();
  }, []);

  const login = async (email: string, password: string) => {
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    
    if (found) {
      setIsLogged(true);
      setUser(found);
      // 2. Salva o usuário na memória do celular
      await AsyncStorage.setItem("@NoteApp:user", JSON.stringify(found));
      return true;
    }
    
    setIsLogged(false);
    setUser(null);
    return false;
  };

  const logout = async () => {
    setIsLogged(false);
    setUser(null);
    // 3. Remove o usuário da memória do celular ao sair
    await AsyncStorage.removeItem("@NoteApp:user");
  };

  return (
    <Context.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </Context.Provider>
  );
}