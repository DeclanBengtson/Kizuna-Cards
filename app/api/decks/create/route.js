// app/api/decks/create/route.js
import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions');
    const { title, description, style, questions, userId } = await req.json();

    if (!title || !description || !style || !userId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newDeck = {
      title,
      description,
      style,
      questions: questions || [],
      userId,
      createdAt: new Date(),
    };

    const result = await db.collection('decks').insertOne(newDeck);

    // Fetch the inserted deck using the insertedId
    const insertedDeck = await db.collection('decks').findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, deck: insertedDeck }, { status: 201 });
  } catch (error) {
    console.error('Error creating deck:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}