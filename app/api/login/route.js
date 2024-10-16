import { compare } from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';
import { sign } from 'jsonwebtoken';

export const POST = async (req) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('myDatabase'); // Replace with your database name

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    const token = sign(
      { userId: user._id, email: user.email, subscribed: user.subscribed }, // Include subscription status
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};