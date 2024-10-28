'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SubscriptionCard = ({ subscription, onSubscribe, isLoading }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h3 className="card-title">{subscription.name}</h3>
      <p className="text-base-content/70">{subscription.description}</p>
      
      <div className="my-4">
        <div className="text-3xl font-bold">
          {(subscription.price / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: subscription.currency
          })}
          <span className="text-base font-normal opacity-70">
            /{subscription.interval}
          </span>
        </div>
        
        {subscription.features?.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <div className="badge badge-primary badge-xs"></div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="card-actions justify-end mt-4">
        <button
          className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
          onClick={() => onSubscribe(subscription.priceId)}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Get Pro'}
        </button>
      </div>
    </div>
  </div>
);

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPriceId, setProcessingPriceId] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/subscriptions');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch subscriptions');
        }
        const data = await response.json();

        const transformedData = data.map(subscription => ({
          ...subscription,
          features: [
            `${subscription.interval}ly billing`,
            'Full access to all features',
            'Priority support'
          ]
        }));

        setSubscriptions(transformedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching subscriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleSubscribe = async (priceId) => {
    try {
      setProcessingPriceId(priceId);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }
      
      const response = await fetch('/api/subscriptions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (!data.sessionId) {
        throw new Error('No session ID returned from the server');
      }
      
      const { error } = await stripe.redirectToCheckout({ 
        sessionId: data.sessionId 
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err.message || 'Failed to initiate checkout. Please try again.');
    } finally {
      setProcessingPriceId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Upgrade to Premium</h2>
        <p className="text-base-content/70 mt-2">
          Get unlimited access to all features
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {subscriptions.length === 0 && !error ? (
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No subscription plans are currently available. Please check back later.</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.priceId}
              subscription={subscription}
              onSubscribe={handleSubscribe}
              isLoading={processingPriceId === subscription.priceId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;