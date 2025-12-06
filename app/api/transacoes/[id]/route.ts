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
    return NextResponse.json(transacao);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar transação" });
  }
}
