import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // pega o body
    const { email, senha } = await request.json();
    // pega o email e senha no env
    const emailEnv = process.env.EMAIL;
    const senhaEnv = process.env.PASSWORD_HASH!;

    // valida se os dados foram preenchidos
    if (!email || !senha) {
      return NextResponse.json(
        {
          success: false,
          error: "Por favor, preencha todos os campos.",
        },
        { status: 400 }
      );
    }
    // verifica se o email e senha conferem
    const senhaValida = await bcrypt.compare(senha, senhaEnv);
    const emailValido = email === emailEnv;
    // valida se o email e senha conferem
    if (!emailValido || !senhaValida) {
      return NextResponse.json(
        {
          success: false,
          error: "Email ou senha incorretos.",
        },
        { status: 401 }
      );
    }
    // retorna o token
    return NextResponse.json(
      {
        success: true,
        message: "Login realizado com sucesso.",
        token: "token",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao fazer login.",
      },
      { status: 500 }
    );
  }
}
