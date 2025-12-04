import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const receitas = await prisma.receita.findMany();
    // valida se as receitas foram encontradas
    if (!receitas)
      return NextResponse.json({ error: "Receitas não encontradas" });
    // se nenhuma receita for encontrada, retorna um array vazio
    if (receitas.length === 0) return NextResponse.json([]);
    return NextResponse.json(receitas);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar receitas" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const receita = await prisma.receita.create({ data: body });
    return NextResponse.json({
      message: "Receita criada com sucesso",
      receita,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar receita" });
  }
}
