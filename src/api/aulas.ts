import { apiClient } from "./apiClient";
import { Aula, NewAula } from "../types/aulas";

export const getAulas = async (): Promise<Aula[]> => {
  const response = await apiClient.get("/aulas");
  return response.data.content;
};

export const getAulasByCurso = async (cursoId: string): Promise<Aula[]> => {
  const response = await apiClient.get(`/aulas/curso/${cursoId}`);
  return response.data.content;
};

export const getAula = async (id: string): Promise<Aula> => {
  const response = await apiClient.get(`/aulas/${id}`);
  return response.data;
};

export const createAula = async (aula: NewAula): Promise<Aula> => {
  const response = await apiClient.post("/aulas", aula);
  return response.data;
};

export const updateAula = async (id: string, aula: NewAula): Promise<Aula> => {
  const response = await apiClient.put(`/aulas/${id}`, aula);
  return response.data;
};

export const deleteAula = async (id: string): Promise<void> => {
  await apiClient.delete(`/aulas/${id}`);
};
