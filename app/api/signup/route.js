import { hash } from 'bcryptjs';
import clientPromise from '../../../lib/mogodb';

export const POST = async (req) => {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('myDatabase'); // Replace with your database name

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};