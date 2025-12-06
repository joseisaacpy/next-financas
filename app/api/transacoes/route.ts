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
    // retorna as transações
    return NextResponse.json({
      sucess: true,
      data: transacoes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao buscar transações",
      },
      { status: 500 }
    );
  }
}
