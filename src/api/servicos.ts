import { apiClient } from "./apiClient";
import { Servico, NewServico } from "../types/servicos";

export const getServicos = async (): Promise<Servico[]> => {
  const response = await apiClient.get("/servicos");
  return response.data.content;
};

export const getServico = async (id: string): Promise<Servico> => {
  const response = await apiClient.get(`/servicos/${id}`);
  return response.data;
};

export const createServico = async (servico: NewServico): Promise<Servico> => {
  const response = await apiClient.post("/servicos", servico);
  return response.data;
};

export const updateServico = async (id: string, servico: NewServico): Promise<Servico> => {
  const response = await apiClient.put(`/servicos/${id}`, servico);
  return response.data;
};

export const aceitarServico = async (id: string, profissionalId: string): Promise<Servico> => {
  const response = await apiClient.put(`/servicos/${id}/aceitar?profissionalId=${profissionalId}`);
  return response.data;
};

export const deleteServico = async (id: string): Promise<void> => {
  await apiClient.delete(`/servicos/${id}`);
};
