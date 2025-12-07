export type FormData = {
  titulo: string;
  descricao: string;
  valor: number;
  tipo: "DESPESA" | "RECEITA" | "";
  categoriaId: string;
  data: string;
};
