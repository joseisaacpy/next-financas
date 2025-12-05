import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const gastos = await prisma.gasto.findMany();
    // valida se as gastos foram encontradas
    if (!gastos) return NextResponse.json({ error: "gastos não encontradas" });
    // se nenhuma receita for encontrada, retorna um array vazio
    if (gastos.length === 0) return NextResponse.json([]);
    return NextResponse.json(gastos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar gastos" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gasto = await prisma.gasto.create({
      data: {
        titulo: body.titulo,
        descricao: body.descricao,
        valor: body.valor,
        criadoEm: new Date(body.data),
        categoria: body.categoria,
      },
    });

    return NextResponse.json({ message: "Gasto criado com sucesso", gasto });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar gasto" });
  }
}
