import { apiClient } from "./apiClient";
import { Profissional, NewProfissional } from "../types/profissionais";

export const getProfissionais = async (): Promise<Profissional[]> => {
  const response = await apiClient.get("/profissionais");
  return response.data.content;
};

export const getProfissional = async (id: string): Promise<Profissional> => {
  const response = await apiClient.get(`/profissionais/${id}`);
  return response.data;
};

export const createProfissional = async (profissional: NewProfissional): Promise<Profissional> => {
  const response = await apiClient.post("/profissionais", profissional);
  return response.data;
};

export const updateProfissional = async (id: string, profissional: NewProfissional): Promise<Profissional> => {
  const response = await apiClient.put(`/profissionais/${id}`, profissional);
  return response.data;
};

export const deleteProfissional = async (id: string): Promise<void> => {
  await apiClient.delete(`/profissionais/${id}`);
};
