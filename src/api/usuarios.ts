import { apiClient } from "./apiClient";
import { Usuario, NewUsuario } from "../types/usuarios";

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await apiClient.get("/usuarios");
  return response.data.content;
};

export const getUsuario = async (id: string): Promise<Usuario> => {
  const response = await apiClient.get(`/usuarios/${id}`);
  return response.data;
};

export const createUsuario = async (usuario: NewUsuario): Promise<Usuario> => {
  const response = await apiClient.post("/usuarios", usuario);
  return response.data;
};

export const updateUsuario = async (id: string, usuario: NewUsuario): Promise<Usuario> => {
  const response = await apiClient.put(`/usuarios/${id}`, usuario);
  return response.data;
};

export const deleteUsuario = async (id: string): Promise<void> => {
  await apiClient.delete(`/usuarios/${id}`);
};
