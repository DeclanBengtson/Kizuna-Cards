'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Move this to an environment variable
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SubscriptionCard = ({ subscription, onSubscribe, isLoading }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h3 className="card-title">{subscription.name}</h3>
      <p className="text-base-content/70">{subscription.description}</p>
      
      <div className="my-4">
        <div className="text-3xl font-bold">
          ${(subscription.price / 100).toFixed(2)}
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
          {isLoading ? 'Processing...' : 'Get Premium'}
        </button>
      </div>
    </div>
  </div>
);

const Subscriptions = ({ onClose }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPriceId, setProcessingPriceId] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/subscriptions');
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid subscription data format');
        }
        setSubscriptions(data);
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
      const stripe = await stripePromise;
      
      const response = await fetch('/api/subscriptions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();
      
      const { error } = await stripe.redirectToCheckout({ 
        sessionId: session.id 
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Failed to initiate checkout. Please try again.');
    } finally {
      setProcessingPriceId(null);
    }
  };

  if (loading) {
    return (
      <div className="modal modal-open">
        <div className="modal-box flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box relative w-11/12 max-w-4xl">
        <button 
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Upgrade to Premium</h2>
            <p className="text-base-content/70 mt-2">
              Get unlimited access to all features
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;