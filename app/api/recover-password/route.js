import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // Specify Node.js runtime

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions'); // Replace with your database name

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    // Create a password reset token (you should save this in your database)
    const token = 'dummy-token'; // Replace with real token generation logic

    // Send recovery email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Recovery',
      text: `Please use the following link to reset your password: https://yourdomain.com/reset-password?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Recovery email sent' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}