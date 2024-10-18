import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const GET = async () => {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true, // Only fetch active prices
    });

    const subscriptions = prices.data
      .filter(price => price.recurring) // Filter out prices without recurring information
      .map(price => ({
        priceId: price.id,
        name: price.product?.name || 'Unnamed Product',
        description: price.product?.description || 'No description available',
        price: price.unit_amount,
        interval: price.recurring?.interval || 'unknown',
        currency: price.currency,
      }));

    if (subscriptions.length === 0) {
      console.warn('No active recurring prices found');
      return new Response(JSON.stringify({ message: 'No subscription plans available' }), { status: 404 });
    }

    return new Response(JSON.stringify(subscriptions), { status: 200 });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
  }
};