import { authClient } from "./authClient";
import { Login, Register, AuthResponse } from "../types/auth";

export const login = async (data: Login): Promise<AuthResponse> => {
  const response = await authClient.post("/auth/login", data);
  return response.data;
};

export const register = async (data: Register): Promise<AuthResponse> => {
  const response = await authClient.post("/auth/registrar", data);
  return response.data;
};
