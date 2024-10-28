// pages/api/decks/index.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions');
    const { userId } = req.query;

    const decks = await db.collection('decks').find({ userId }).toArray();
    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch decks', error });
  }
}