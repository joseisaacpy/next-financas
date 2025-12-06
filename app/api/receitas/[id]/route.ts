import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const receita = await prisma.receita.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!receita) return NextResponse.json({ error: "Receita não encontrada" });
    return NextResponse.json(receita);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar receita" });
  }
}

// DELETE
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.receita.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "Receita deletada com sucesso" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao deletar receita" });
  }
}
