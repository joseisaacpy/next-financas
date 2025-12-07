import type { Categoria } from "@/types/categoria";

export type LinhaTabela = {
  id: number;
  titulo: string;
  descricao: string | null;
  valor: number;
  tipo: "DESPESA" | "RECEITA";
  criadoEm: Date;
  categoria: Categoria;
};
