import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginApi, register as registerApi } from "../api/auth";
import { Login, Register } from "../types/auth";

interface AuthContextData {
  token: string | null;
  loading: boolean;
  login: (data: Login) => Promise<void>;
  register: (data: Register) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("@token");
      if (savedToken) {
        setToken(savedToken);
      }
    } catch (error) {
      console.error("Erro ao carregar token:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: Login) => {
    const response = await loginApi(data);
    setToken(response.token);
    await AsyncStorage.setItem("@token", response.token);
  };

  const register = async (data: Register) => {
    const response = await registerApi(data);
    setToken(response.token);
    await AsyncStorage.setItem("@token", response.token);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("@token");
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
