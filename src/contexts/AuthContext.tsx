import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginApi, register as registerApi } from "../api/auth";
import { Login, Register } from "../types/auth";

interface User {
  id: string;
  nome: string;
  email: string;
  cidade: string;
  tipoUsuario: string;
  area: { id: string; nome: string } | null;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (data: Login) => Promise<void>;
  register: (data: Register) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("@token");
      const savedUser = await AsyncStorage.getItem("@user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: Login) => {
    const response = await loginApi(data);
    setToken(response.token);
    setUser(response.usuario);
    await AsyncStorage.setItem("@token", response.token);
    await AsyncStorage.setItem("@user", JSON.stringify(response.usuario));
  };

  const register = async (data: Register) => {
    const response = await registerApi(data);
    setToken(response.token);
    setUser(response.usuario);
    await AsyncStorage.setItem("@token", response.token);
    await AsyncStorage.setItem("@user", JSON.stringify(response.usuario));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
