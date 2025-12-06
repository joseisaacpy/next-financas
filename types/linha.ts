import { CategoriaGasto, CategoriaReceita } from "@/lib/generated/prisma/enums";

export type LinhaTabela = {
  id: number;
  titulo: string;
  descricao: string | null;
  valor: number;
  categoria: CategoriaGasto | CategoriaReceita;
  criadoEm: Date;
};
