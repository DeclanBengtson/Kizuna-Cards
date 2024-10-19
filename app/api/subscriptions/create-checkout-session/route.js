import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import clientPromise from '../../../../lib/mongodb';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Route Segment Configurations
export const runtime = 'nodejs'; // Use Node.js runtime
export const revalidate = false; // No revalidation
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const fetchCache = 'force-no-store'; // Do not cache
export const preferredRegion = 'auto'; // Default region

export const POST = async (req) => {
  const client = await clientPromise;
  const db = client.db('myDatabase'); // Replace with your database name

  const body = await buffer(req);
  const signature = headers().get('stripe-signature');

  let event;

  // Verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const data = event.data;
  const eventType = event.type;

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        const session = await stripe.checkout.sessions.retrieve(data.object.id, {
          expand: ['line_items'],
        });
        const customerId = session.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session.line_items.data[0].price.id;

        let user = await db.collection('users').findOne({ email: customer.email });

        if (!user) {
          await db.collection('users').insertOne({
            email: customer.email,
            name: customer.name,
            stripeCustomerId: customerId,
            priceId,
            hasAccess: true,
          });
        } else {
          await db.collection('users').updateOne(
            { email: customer.email },
            { $set: { priceId, hasAccess: true } }
          );
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = await stripe.subscriptions.retrieve(data.object.id);
        const user = await db.collection('users').findOne({
          stripeCustomerId: subscription.customer,
        });

        if (user) {
          await db.collection('users').updateOne(
            { stripeCustomerId: subscription.customer },
            { $set: { hasAccess: false } }
          );
        }

        break;
      }

      default:
        console.warn(`Unhandled event type ${eventType}`);
    }
  } catch (e) {
    console.error('Stripe error:', e.message, '| EVENT TYPE:', eventType);
  }

  return NextResponse.json({});
};