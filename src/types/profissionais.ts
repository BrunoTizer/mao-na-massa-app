import { Usuario } from "./usuarios";

export interface Profissional {
  id: string;
  usuario: Usuario;
  descricao: string;
  avaliacaoMedia: number;
  disponivel: boolean;
}

export interface NewProfissional {
  usuarioId: string;
  descricao: string;
  avaliacaoMedia: number;
  disponivel: boolean;
}
