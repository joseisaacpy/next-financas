import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // buscar todas as transações em ordenando por data e includindo a categoria
    const transacoes = await prisma.transacao.findMany({
      orderBy: {
        criadoEm: "desc",
      },
      include: {
        categoria: true,
      },
    });

    // separar as receitas e as despesas
    const receitas = transacoes.filter(
      (transacao) => transacao.tipo === "RECEITA"
    );

    const despesas = transacoes.filter(
      (transacao) => transacao.tipo === "DESPESA"
    );

    // pega as ultimas transações
    const ultimasTransacoes = transacoes.slice(0, 5);

    // pega a ultima transação
    const ultimaTransacao = transacoes[0];

    // pega as categorias
    const categorias = await prisma.categoria.findMany();

    return NextResponse.json({
      success: true,
      data: {
        receitas,
        despesas,
        ultimaTransacao,
        ultimasTransacoes,
        categorias,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Erro ao buscar dados para o dashboard",
    });
  }
}
