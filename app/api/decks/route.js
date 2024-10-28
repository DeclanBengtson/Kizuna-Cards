// pages/api/decks/index.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Couples-Questions');

  switch (req.method) {
    case 'POST':
      const deck = req.body;
      await db.collection('decks').insertOne(deck);
      res.status(201).json(deck);
      break;
    case 'GET':
      const decks = await db.collection('decks').find({ userId: req.query.userId }).toArray();
      res.status(200).json(decks);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}