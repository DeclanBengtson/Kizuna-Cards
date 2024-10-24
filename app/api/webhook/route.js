import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import clientPromise from '../../../lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('Couples-Questions');

    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      console.error('No stripe signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

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

    switch (eventType) {
      case 'checkout.session.completed': {
        // First payment is successful and a subscription is created
        try {
          const session = await stripe.checkout.sessions.retrieve(data.object.id, {
            expand: ['line_items', 'customer'],
          });

          if (!session.customer) {
            throw new Error('No customer found in session');
          }

          const customerId = typeof session.customer === 'string' 
            ? session.customer 
            : session.customer.id;

          const customer = typeof session.customer === 'string'
            ? await stripe.customers.retrieve(customerId)
            : session.customer;

          if (!session.line_items?.data?.[0]?.price?.id) {
            throw new Error('No price ID found in session');
          }

          const priceId = session.line_items.data[0].price.id;

          let user = await db.collection('users').findOne({ email: customer.email });

          if (!user) {
            await db.collection('users').insertOne({
              email: customer.email,
              name: customer.name,
              stripeCustomerId: customerId,
              priceId,
              hasAccess: true,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          } else {
            await db.collection('users').updateOne(
              { email: customer.email },
              { 
                $set: { 
                  priceId, 
                  hasAccess: true,
                  updatedAt: new Date()
                } 
              }
            );
          }
        } catch (error) {
          console.error('Error processing checkout.session.completed:', error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        try {
          const subscription = await stripe.subscriptions.retrieve(data.object.id);
          
          if (!subscription.customer) {
            throw new Error('No customer found in subscription');
          }

          const result = await db.collection('users').updateOne(
            { stripeCustomerId: subscription.customer },
            { 
              $set: { 
                hasAccess: false,
                updatedAt: new Date()
              } 
            }
          );

          if (result.matchedCount === 0) {
            console.warn(`No user found with stripeCustomerId: ${subscription.customer}`);
          }
        } catch (error) {
          console.error('Error processing customer.subscription.deleted:', error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
        break;
      }

      default:
        console.warn(`Unhandled event type ${eventType}`);
        return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}