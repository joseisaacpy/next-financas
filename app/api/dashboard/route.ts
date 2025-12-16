import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // faz a consulta das informações
    const [metricas, ultimasTransacoes] = await Promise.all([
      // métricas por grupo
      prisma.transacao.groupBy({
        by: ["tipo"],
        _count: { _all: true },
        _sum: { valor: true },
      }),
      // ultimas transações
      prisma.transacao.findMany({
        orderBy: { criadoEm: "desc" },
        take: 5,
        include: { categoria: true },
      }),
    ]);

    // cria o resumo para deixar a api mais limpa e simplificada
    const resumo = {
      totalReceitas: 0,
      totalDespesas: 0,
      quantidadeReceitas: 0,
      quantidadeDespesas: 0,
      saldo: 0,
    };
    // pega os valores das métricas e atualiza o resumo
    metricas.forEach((item) => {
      const valor = Number(item._sum.valor ?? 0);

      if (item.tipo === "RECEITA") {
        resumo.totalReceitas = valor;
        resumo.quantidadeReceitas = item._count._all;
      }

      if (item.tipo === "DESPESA") {
        resumo.totalDespesas = valor;
        resumo.quantidadeDespesas = item._count._all;
      }
    });
    resumo.saldo = resumo.totalReceitas - resumo.totalDespesas;

    // pega a utlimma transacao, e se nao houver transacoes, retorna null
    const ultimaTransacao =
      ultimasTransacoes.length === 0 ? null : ultimasTransacoes[0];

    return NextResponse.json(
      {
        success: true,
        data: {
          resumo,
          ultimaTransacao,
          ultimasTransacoes,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar dados para o dashboard",
      },
      { status: 500 }
    );
  }
}
