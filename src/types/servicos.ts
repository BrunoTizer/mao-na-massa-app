import { Profissional } from "./profissionais";

export interface Servico {
  id: string;
  profissional: Profissional | null;
  titulo: string;
  descricao: string;
  cidade: string;
  preco: number;
  dataPublicacao: string;
  status: string;
}

export interface NewServico {
  profissionalId: string | null;
  titulo: string;
  descricao: string;
  cidade: string;
  preco: number;
}
