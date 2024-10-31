import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

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

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'Deck ID is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions');

    const result = await db.collection('decks').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Deck not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting deck:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}