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
