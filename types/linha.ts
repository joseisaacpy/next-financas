import type { Categoria } from "./categoria";

import type { TipoTransacao } from "./tipoTransacao";

export type LinhaTabela = {
  id: number;
  titulo: string;
  descricao: string | null;
  valor: number;
  tipo: TipoTransacao;
  criadoEm: Date;
  categoria: Categoria;
};
