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

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'O nome é obrigatório.' },
        { status: 400 }
      );
    }

    // Helper to normalize names for accent/case-insensitive matching
    const normalizeName = (s: string) => {
      return s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
    };

    const isAttending = attending === undefined ? true : (attending === true || attending === 'yes');

    // Look for an existing guest with the same normalized name
    const allGuests = await db.rSVP.findMany();
    const existingGuest = allGuests.find(
      (g) => normalizeName(g.name) === normalizeName(name)
    );

    let rsvp;

    if (existingGuest) {
      // Update existing registration
      rsvp = await db.rSVP.update({
        where: { id: existingGuest.id },
        data: {
          name: name.trim(),
          phone: phone || existingGuest.phone || null,
          companion: companion || 'no',
          companionName: companion === 'yes' ? (companionName?.trim() || null) : null,
          mealPreference: mealPreference || null,
          dietaryNeeds: dietaryNeeds || null,
          attending: isAttending,
          gift: gift || null,
          relationship: relationship || existingGuest.relationship || null,
          message: message ? message.trim() : null,
        },
      });
    } else {
      // Generate safe unique email if email is placeholder or not unique
      const cleanName = normalizeName(name).replace(/[^a-z0-9]/g, '-');
      const uniqueSuffix = Math.random().toString(36).substring(2, 8);
      const guestEmail = (email && !email.endsWith('@confirmado.com') && !email.startsWith('manual-'))
        ? email.trim()
        : `${cleanName || 'convidado'}-${uniqueSuffix}@confirmado.com`;

      // Create new RSVP guest
      rsvp = await db.rSVP.create({
        data: {
          name: name.trim(),
          email: guestEmail,
          phone: phone || null,
          companion: companion || 'no',
          companionName: companion === 'yes' ? (companionName?.trim() || null) : null,
          mealPreference: mealPreference || null,
          dietaryNeeds: dietaryNeeds || null,
          attending: isAttending,
          gift: gift || null,
          relationship: relationship || null,
          message: message ? message.trim() : null,
        },
      });
    }

    // If a warm message is provided, also record it into Wish mural for admin panel
    if (message && message.trim()) {
      try {
        await db.wish.create({
          data: {
            name: name.trim(),
            message: message.trim(),
          },
        });
      } catch (wishErr) {
        console.error('Error saving wish:', wishErr);
      }
    }

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    if (message.includes('Unique')) {
      return NextResponse.json(
        { error: 'Este convidado já foi registado com estes dados.' },
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
