import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - busca todas as categorias
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany();
    // retorna as categorias
    return NextResponse.json({
      success: true,
      data: categorias,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar categoria",
      },
      { status: 500 }
    );
  }
}

// POST - cria uma nova categoria
export async function POST(request: Request) {
  try {
    // pega o body
    const body = await request.json();
    // cria a categoria
    const categoria = await prisma.categoria.create({
      data: body,
    });
    return NextResponse.json(
      {
        success: true,
        data: categoria,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao criar categoria",
      },
      { status: 500 }
    );
  }
}
