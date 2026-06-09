import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      companion,
      companionName,
      mealPreference,
      dietaryNeeds,
      attending,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios.' },
        { status: 400 }
      );
    }

    const rsvp = await db.rSVP.create({
      data: {
        name,
        email,
        phone: phone || null,
        companion: companion || null,
        companionName: companionName || null,
        mealPreference: mealPreference || null,
        dietaryNeeds: dietaryNeeds || null,
        attending: attending === true,
        message: message || null,
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    if (message.includes('Unique')) {
      return NextResponse.json(
        { error: 'Este email já foi utilizado para RSVP.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rsvps = await db.rSVP.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const totalAttending = rsvps.filter((r) => r.attending).length;
    return NextResponse.json({ rsvps, totalAttending });
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar RSVPs.' }, { status: 500 });
  }
}
