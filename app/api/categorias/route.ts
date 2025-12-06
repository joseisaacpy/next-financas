import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - busca todas as categorias
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany();
    // valida se as transações foram encontradas
    if (!categorias)
      return NextResponse.json(
        { error: "Categorias não encontradas" },
        { status: 404 }
      );
    // se nenhuma categoria for encontrada, retorna um array vazio
    if (categorias.length === 0) return NextResponse.json([]);
    return NextResponse.json(categorias);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar categoria" });
  }
}

// POST - cria uma nova categoria
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const categoria = await prisma.categoria.create({
      data: body,
    });
    return NextResponse.json(categoria, {
      status: 201,
    });
    // return NextResponse.json(categorias);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar categoria" });
  }
}
