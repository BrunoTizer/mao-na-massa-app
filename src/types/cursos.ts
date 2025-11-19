export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  area: {
    id: string;
    nome: string;
  };
  nivel: string;
  dataCriacao: string;
}

export interface NewCurso {
  titulo: string;
  descricao: string;
  areaId: string;
  nivel: string;
}
