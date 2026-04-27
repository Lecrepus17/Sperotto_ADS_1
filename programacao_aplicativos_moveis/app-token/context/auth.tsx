import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  isLogged: boolean;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchWithAuth: <T = any>(
    input: RequestInfo,
    init?: RequestInit,
  ) => Promise<T>;
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
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadToken() {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        setIsLogged(true);
      }
      setLoading(false);
    }

    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: email,
          pwd: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const authToken = data.token;
      if (!authToken) throw new Error("Token não recebido");

      await AsyncStorage.setItem("authToken", authToken);
      setToken(authToken);
      setIsLogged(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("authToken");
    setToken(null);
    setIsLogged(false);
  };

  const fetchWithAuth = async <T = any,>(
    input: RequestInfo,
    init: RequestInit = {},
  ) => {
    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${token}`);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(input, { ...init, headers });

    if (response.status === 401) {
      await logout();
      throw new Error("Sessão expirada");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || response.statusText || "Erro na requisição",
      );
    }

    return response.json() as Promise<T>;
  };

  return (
    <Context.Provider
      value={{ isLogged, token, loading, login, logout, fetchWithAuth }}
    >
      {children}
    </Context.Provider>
  );
}
