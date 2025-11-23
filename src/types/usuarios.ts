import { Area } from "./areas";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cidade: string;
  area: Area;
  tipoUsuario: string;
  dataCriacao: string;
}

export interface NewUsuario {
  nome: string;
  email: string;
  cidade: string;
  areaId: string;
  tipoUsuario: string;
}
