import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const gasto = await prisma.gasto.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!gasto) return NextResponse.json({ error: "Gasto não encontrado" });
    return NextResponse.json(gasto);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar gasto" });
  }
}

// DELETE
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.gasto.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "Gasto deletado com sucesso" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao deletar gasto" });
  }
}
