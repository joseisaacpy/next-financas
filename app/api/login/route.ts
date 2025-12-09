import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // pega o body vindo do request
    const { email, senha } = await request.json();

    // pega o email, senha e secret
    const emailEnv = process.env.EMAIL;
    const senhaEnv = process.env.PASSWORD_HASH!;
    const jwtSecret = process.env.JWT_SECRET!;

    // pega o cookie
    const cookieStore = cookies();

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

    // Gera token JWT
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "2d" });

    // Salva cookie
    (await cookieStore).set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 dias
    });
    return NextResponse.json(
      {
        success: true,
        message: "Login realizado com sucesso.",
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
