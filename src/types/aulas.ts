import { Curso } from "./cursos";

export interface Aula {
  id: string;
  curso: Curso;
  titulo: string;
  conteudo: string;
  ordem: number;
}

export interface NewAula {
  cursoId: string;
  titulo: string;
  conteudo: string;
  ordem: number;
}
