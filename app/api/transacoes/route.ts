import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - busca todas as transações
export async function GET() {
  try {
    const transacoes = await prisma.transacao.findMany({
      orderBy: {
        criadoEm: "desc",
      },
    });
    // valida se as transações foram encontradas
    if (!transacoes)
      return NextResponse.json(
        { error: "Transações não encontradas" },
        { status: 404 }
      );
    // se nenhuma transação for encontrada, retorna um array vazio
    if (transacoes.length === 0) return NextResponse.json([]);
    return NextResponse.json(transacoes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar transações" });
  }
}
