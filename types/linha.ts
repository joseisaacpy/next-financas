import { Decimal } from "@prisma/client/runtime/client";
import { CategoriaGasto, CategoriaReceita } from "@/lib/generated/prisma/enums";

export type LinhaTabela = {
  id: number;
  titulo: string;
  descricao: string | null;
  valor: Decimal;
  categoria: CategoriaGasto | CategoriaReceita;
  criadoEm: Date;
};
