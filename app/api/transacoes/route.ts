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
      success: true,
      data: transacoes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
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

    // transformar o body em um objeto do prisma
    const transacaoData = {
      titulo: body.titulo,
      descricao: body.descricao,
      valor: Number(body.valor),
      tipo: body.tipo,
      categoriaId: Number(body.categoriaId),
    };
    // cria a transação
    const transacao = await prisma.transacao.create({
      data: transacaoData,
    });
    return NextResponse.json(
      {
        success: true,
        data: transacao,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao criar transação",
      },
      { status: 500 }
    );
  }
}
