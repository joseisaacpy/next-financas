import { CategoriaGasto, CategoriaReceita } from "@/lib/generated/prisma/enums";

// função para pegar as categorias com base no tipo
export function useCategorias(tipo: "gasto" | "receita") {
  return tipo === "gasto"
    ? Object.values(CategoriaGasto)
    : Object.values(CategoriaReceita);
}
