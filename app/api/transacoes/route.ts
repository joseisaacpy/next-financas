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

// POST - cria uma nova transação
export async function POST(request: Request) {
  try {
    // pega o body
    const body = await request.json();
    // cria a transação
    const transacao = await prisma.transacao.create({
      data: body,
    });
    return NextResponse.json(
      {
        sucess: true,
        data: transacao,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao criar transação",
      },
      { status: 500 }
    );
  }
}
