import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const GET = async () => {
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
    return new Response(JSON.stringify(subscriptions), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};