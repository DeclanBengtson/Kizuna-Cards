import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Updated to the latest API version
});

export const POST = async (req) => {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return new Response(JSON.stringify({ message: 'Missing priceId' }), { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return new Response(JSON.stringify({ message: 'Server configuration error' }), { status: 500 });
    }

    // Verify that the price exists and is active
    try {
      const price = await stripe.prices.retrieve(priceId);
      if (!price.active) {
        return new Response(JSON.stringify({ message: 'Invalid or inactive price ID' }), { status: 400 });
      }
    } catch (error) {
      console.error('Error retrieving price:', error);
      return new Response(JSON.stringify({ message: 'Invalid price ID' }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}`,
    });

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (error) {
    console.error('Checkout session creation error:', error);
    return new Response(JSON.stringify({ 
      message: 'Internal Server Error', 
      error: error.message 
    }), { status: 500 });
  }
};