import type { Transacao, Categoria } from "@prisma/client";
import type { LinhaTabela } from "@/types/linha";

export function transformTransacao(
  transacao: Transacao & { categoria: Categoria }
): LinhaTabela {
  return {
    ...transacao,
    valor: Number(transacao.valor),
  };
}

export function transformLista(
  lista: (Transacao & { categoria: Categoria })[]
): LinhaTabela[] {
  return lista.map(transformTransacao);
}
