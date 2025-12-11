import { NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transacoes = await prisma.transacao.findMany();
    const categorias = await prisma.categoria.findMany();

    return NextResponse.json({
      success: true,
      data: {
        transacoes,
        categorias,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Erro ao buscar dados para o dashboard",
    });
  }
}
