import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Nome e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    const wish = await db.wish.create({
      data: { name, message },
    });

    return NextResponse.json(wish, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const wishes = await db.wish.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(wishes);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar desejos.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');

    if (id) {
      await db.wish.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    if (name) {
      await db.wish.deleteMany({ where: { name } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'ID ou Nome é obrigatório.' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao eliminar desejo.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
