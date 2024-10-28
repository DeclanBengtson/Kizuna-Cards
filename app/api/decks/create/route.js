// pages/api/decks/create.js
import clientPromise from '../../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions');
    const { title, description, style, questions, userId } = req.body;

    const newDeck = {
      title,
      description,
      style,
      questions: questions || [],
      userId,
      createdAt: new Date(),
    };

    const result = await db.collection('decks').insertOne(newDeck);
    res.status(201).json({ success: true, deck: result.ops[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create deck', error });
  }
}