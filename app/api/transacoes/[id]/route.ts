import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET - busca uma transação por id
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // pega o id
    const { id } = await context.params;
    // busca a transação
    const transacao = await prisma.transacao.findUnique({
      where: {
        id: Number(id),
      },
    });
    // valida se a transação foi encontrada
    if (!transacao)
      return NextResponse.json(
        { error: "Transação não encontrada" },
        { status: 404 }
      );
    // retorna a transação
    return NextResponse.json({
      sucess: true,
      data: transacao,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao buscar transação",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE - deleta uma transação por id
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // pega o id
    const { id } = await context.params;
    // deleta a transação
    const transacao = await prisma.transacao.delete({
      where: {
        id: Number(id),
      },
    });
    // retorna a transação deletada
    return NextResponse.json({
      sucess: true,
      data: transacao,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao deletar transação",
      },
      { status: 500 }
    );
  }
}
