import { Profissional } from "./profissionais";

export interface Servico {
  id: string;
  profissional: Profissional;
  titulo: string;
  descricao: string;
  cidade: string;
  preco: number;
  dataPublicacao: string;
}

export interface NewServico {
  profissionalId: string;
  titulo: string;
  descricao: string;
  cidade: string;
  preco: number;
}
