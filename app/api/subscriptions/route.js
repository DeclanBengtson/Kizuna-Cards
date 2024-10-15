import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function GET() {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
    });
    const subscriptions = prices.data.map(price => ({
      priceId: price.id,
      name: price.product.name,
      description: price.product.description,
      price: price.unit_amount,
      interval: price.recurring.interval,
    }));
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.error(new Error(error.message));
  }
}