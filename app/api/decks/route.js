// app/api/decks/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions');

    // Extract userId from the request URL
    const { searchParams } = new URL(req.url);
    // const userId = searchParams.get('userId');
    const userId = "your-user-id";

    if (!userId) {
      return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
    }

    const decks = await db.collection('decks').find({ userId }).toArray();
    return NextResponse.json(decks, { status: 200 });
  } catch (error) {
    console.error('Error fetching decks:', error.message);
    return NextResponse.json({ success: false, message: 'Failed to fetch decks', error }, { status: 500 });
  }
}