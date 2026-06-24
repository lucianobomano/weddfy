import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Nome é obrigatório.' }, { status: 400 });
    }

    // Fetch manual guests to perform case-insensitive comparison
    const manualGuests = await db.rSVP.findMany({
      where: {
        email: {
          startsWith: 'manual-',
        },
      },
    });

    const normalizeName = (s: string) => {
      return s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
    };

    const matched = manualGuests.find(
      (g) => normalizeName(g.name) === normalizeName(name)
    );

    if (matched) {
      return NextResponse.json({
        found: true,
        companion: matched.companion || 'no',
        companionName: matched.companionName || '',
      });
    }

    return NextResponse.json({ found: false });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao verificar convidado.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
