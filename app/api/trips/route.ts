import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 1. GET: Fetch trip details (used by NearbyHotels to display the destination)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get('tripId');

    if (!tripId) {
      return NextResponse.json({ success: false, error: 'Missing tripId' }, { status: 400 });
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return NextResponse.json({ success: false, error: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, trip });
  } catch (error) {
    console.error('Failed to fetch trip:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. POST: Create a new trip (from Destinations) or update stay/dates (from NearbyHotels)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripId, destination, startDate, endDate, stay, userId } = body;

    let trip;

    if (tripId) {
      trip = await prisma.trip.update({
        where: { id: tripId },
        data: {
          ...(destination && { destination }),
          ...(startDate && { startDate: new Date(startDate) }),
          ...(endDate && { endDate: new Date(endDate) }),
          ...(stay && { stay }),
        },
      });
    } else {
      trip = await prisma.trip.create({
        data: {
          destination: destination || 'Unspecified Destination',
          startDate: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
          userId: userId || null,
        },
      });
    }

    return NextResponse.json({ success: true, trip });
  } catch (error) {
    console.error('Database Trip Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. DELETE: Remove a trip record
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get('tripId');

    if (!tripId) {
      return NextResponse.json({ success: false, error: 'Missing tripId' }, { status: 400 });
    }

    await prisma.trip.delete({
      where: { id: tripId },
    });

    return NextResponse.json({ success: true, message: 'Trip deleted' });
  } catch (error) {
    console.error('Delete Trip Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}