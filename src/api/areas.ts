import { apiClient } from "./apiClient";
import { Area } from "../types/areas";

export const getAreas = async (): Promise<Area[]> => {
  const response = await apiClient.get("/areas");
  return response.data.content;
};

export const getArea = async (id: string): Promise<Area> => {
  const response = await apiClient.get(`/areas/${id}`);
  return response.data;
};

export const createArea = async (nome: string): Promise<Area> => {
  const response = await apiClient.post("/areas", { nome });
  return response.data;
};

export const updateArea = async (id: string, nome: string): Promise<Area> => {
  const response = await apiClient.put(`/areas/${id}`, { nome });
  return response.data;
};

export const deleteArea = async (id: string): Promise<void> => {
  await apiClient.delete(`/areas/${id}`);
};
