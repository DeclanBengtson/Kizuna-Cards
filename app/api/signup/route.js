import { hash } from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const runtime = 'nodejs'; // Specify Node.js runtime

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions'); // Replace with your database name

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    // Create a new Stripe customer
    const customer = await stripe.customers.create({
      email,
      name,
    });

    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      stripeCustomerId: customer.id, // Store the Stripe customer ID
      subscriptionStatus: 'none', // Initial subscription status
      hasAccess: false, // Add this field to align with the webhook handler
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}