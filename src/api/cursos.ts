import { apiClient } from "./apiClient";
import { Curso, NewCurso } from "../types/cursos";

export const getCursos = async (): Promise<Curso[]> => {
  const response = await apiClient.get("/cursos");
  return response.data.content;
};

export const getCurso = async (id: string): Promise<Curso> => {
  const response = await apiClient.get(`/cursos/${id}`);
  return response.data;
};

export const createCurso = async (curso: NewCurso): Promise<Curso> => {
  const response = await apiClient.post("/cursos", curso);
  return response.data;
};

export const updateCurso = async (id: string, curso: NewCurso): Promise<Curso> => {
  const response = await apiClient.put(`/cursos/${id}`, curso);
  return response.data;
};

export const deleteCurso = async (id: string): Promise<void> => {
  await apiClient.delete(`/cursos/${id}`);
};
