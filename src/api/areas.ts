import { apiClient } from "./apiClient";
import { Area } from "../types/areas";

export const getAreas = async (): Promise<Area[]> => {
  const response = await apiClient.get("/areas");
  return response.data.content;
};
