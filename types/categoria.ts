import { TipoTransacao } from "./tipoTransacao";

export type Categoria = {
  id: number;
  nome: string;
  tipo: TipoTransacao;
};
