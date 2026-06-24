import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

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
      gift,
      relationship,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios.' },
        { status: 400 }
      );
    }

    // Check for an existing manual RSVP pre-registration
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

    const existingManual = manualGuests.find(
      (g) => normalizeName(g.name) === normalizeName(name)
    );

    const isAttending = attending === undefined ? true : (attending === true || attending === 'yes');

    let rsvp;

    if (existingManual) {
      // Update existing manual registration
      rsvp = await db.rSVP.update({
        where: { id: existingManual.id },
        data: {
          name,
          email,
          phone: phone || null,
          companion: companion || null,
          companionName: companionName || null,
          mealPreference: mealPreference || null,
          dietaryNeeds: dietaryNeeds || null,
          attending: isAttending,
          gift: gift || null,
          relationship: relationship || existingManual.relationship || null,
          message: message || null,
        },
      });
    } else {
      // Create new RSVP
      rsvp = await db.rSVP.create({
        data: {
          name,
          email,
          phone: phone || null,
          companion: companion || null,
          companionName: companionName || null,
          mealPreference: mealPreference || null,
          dietaryNeeds: dietaryNeeds || null,
          attending: isAttending,
          gift: gift || null,
          relationship: relationship || null,
          message: message || null,
        },
      });
    }

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório.' }, { status: 400 });
    }
    await db.rSVP.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao eliminar.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
