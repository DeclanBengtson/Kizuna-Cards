import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Deck ID is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions');

    const deck = await db.collection('decks').findOne({ _id: new ObjectId(id) });

    if (!deck) {
      return NextResponse.json({ message: 'Deck not found' }, { status: 404 });
    }

    return NextResponse.json(deck, { status: 200 });
  } catch (error) {
    console.error('Error fetching deck:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}