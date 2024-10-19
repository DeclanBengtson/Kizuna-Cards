import { compare } from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Specify Node.js runtime

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions'); // Replace with your database name

    const user = await db.collection('users').findOne({ email });
    console.log('Retrieved user:', user); // Log the retrieved user

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await compare(password, user.password);
    console.log('Password comparison result:', isValid); // Log the password comparison result

    if (!isValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Generated token:', token); // Log the generated token

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}