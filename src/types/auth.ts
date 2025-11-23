export interface Login {
  email: string;
  senha: string;
}

export interface Register {
  nome: string;
  email: string;
  senha: string;
  cidade: string;
  tipoUsuario: string;
}

export interface AuthResponse {
  token: string;
}
