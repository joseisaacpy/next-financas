import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const receitas = await prisma.transacao.findMany({
      where: {
        tipo: "RECEITA",
      },
      orderBy: {
        criadoEm: "desc",
      },
    });
    const despesas = await prisma.transacao.findMany({
      where: {
        tipo: "DESPESA",
      },
      orderBy: {
        criadoEm: "desc",
      },
    });
    const ultimaTransacao = await prisma.transacao.findFirst({
      orderBy: {
        criadoEm: "desc",
      },
    });
    const ultimasTransacoes = await prisma.transacao.findMany({
      orderBy: {
        criadoEm: "desc",
      },
      include: {
        categoria: true,
      },
      take: 5,
    });
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
