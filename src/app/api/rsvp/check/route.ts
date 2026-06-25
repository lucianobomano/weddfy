import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Nome é obrigatório.' }, { status: 400 });
    }

    // Fetch all guests to perform case-insensitive comparison
    const allGuests = await db.rSVP.findMany();

    const normalizeName = (s: string) => {
      return s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
    };

    const isMatch = (g: any, queryName: string) => {
      const normQuery = normalizeName(queryName);
      const normMain = normalizeName(g.name);

      // Direct match
      if (normMain === normQuery) return true;

      // Match parts of combined names (e.g., "Luciano & Tatiana" matching "Luciano" and "Tatiana")
      if (g.companion === 'yes') {
        const normComp = g.companionName ? normalizeName(g.companionName) : '';
        
        const variations = [];
        if (normComp) {
          variations.push(`${normMain}&${normComp}`);
          variations.push(`${normMain}e${normComp}`);
          variations.push(`${normMain}and${normComp}`);
          variations.push(`${normMain}+${normComp}`);
        } else {
          variations.push(`${normMain}&acompanhante`);
          variations.push(`${normMain}eacompanhante`);
          variations.push(`${normMain}andacompanhante`);
          variations.push(`${normMain}+acompanhante`);
        }

        const normQueryNoSpaces = normQuery.replace(/\s+/g, '');
        if (variations.some(v => v.replace(/\s+/g, '') === normQueryNoSpaces)) {
          return true;
        }

        if (normComp && normQuery.includes(normMain) && normQuery.includes(normComp)) {
          return true;
        }
      }

      return false;
    };

    const matched = allGuests.find((g) => isMatch(g, name));

    if (matched) {
      return NextResponse.json({
        found: true,
        confirmed: !!matched.attending,
        name: matched.name,
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
