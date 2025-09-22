import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Valida credenciais (vêm das variáveis de ambiente da Vercel)
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    // Verifica se as variáveis estão configuradas
    if (!validUsername || !validPassword || !jwtSecret) {
      return NextResponse.json(
        { error: 'Configuração de autenticação incompleta' },
        { status: 500 }
      );
    }

    // Valida credenciais
    if (username === validUsername && password === validPassword) {
      // Gera token JWT
      const token = jwt.sign(
        { 
          username, 
          role: 'admin',
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
        },
        jwtSecret
      );

      // Retorna token
      return NextResponse.json({
        success: true,
        token,
        user: {
          username,
          role: 'admin'
        }
      });
    } else {
      // Credenciais inválidas
      return NextResponse.json(
        { error: 'Usuário ou senha inválidos' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}













