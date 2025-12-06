import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET - busca uma categoria por id
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // pega o id
    const { id } = await context.params;
    // busca a categoria
    const categoria = await prisma.categoria.findUnique({
      where: {
        id: Number(id),
      },
    });
    // valida se a categoria foi encontrada
    if (!categoria)
      return NextResponse.json(
        { sucess: false, error: "Categoria não encontrada" },
        { status: 404 }
      );
    // retorna a categoria
    return NextResponse.json({
      sucess: true,
      data: categoria,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      sucess: false,
      error: "Erro ao buscar categoria",
    });
  }
}

// DELETE - deleta uma categoria por id
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // pega o id
    const { id } = await context.params;
    // deleta a categoria
    const categoria = await prisma.categoria.delete({
      where: {
        id: Number(id),
      },
    });
    // retorna a categoria deletada
    return NextResponse.json({
      sucess: true,
      data: categoria,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao deletar categoria",
      },
      { status: 500 }
    );
  }
}
