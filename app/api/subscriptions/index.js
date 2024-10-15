import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async (req = NextApiRequest, res = NextApiResponse) => {
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
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};