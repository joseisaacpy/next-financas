import { TipoTransacao } from "./tipoTransacao";

export type FormData = {
  titulo: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: string;
  data: string;
};
