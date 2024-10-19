'use client'; // Add this line to mark the component as a Client Component

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51Q7aOCP1puy8XJGNgZZz8HOtmiIJVQspEJ2QIalMLT3CkdYdNQjEBX9y8Lmrz6DgyKpcWr7MuC4oxBx4h2M2ggtZ00xtvTVC48');

const Subscriptions = ({ onClose }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setSubscriptions(data);
        } else {
          setError('Failed to load subscriptions.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subscriptions:', error);
        setError('Failed to load subscriptions.');
        setLoading(false);
      });
  }, []);

  const handleSubscribe = async (priceId) => {
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/subscriptions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div className="error text-error">{error}</div>;
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button className="btn btn-circle btn-sm absolute right-2 top-2" onClick={onClose}>X</button>
        <h1 className="text-2xl font-bold mb-4">Upgrade to Pro -</h1>
        <h1 className="text-2xl font-bold mb-4">Get unlimited access</h1>
        <div className="grid grid-cols-1 gap-4">
          {subscriptions.map((subscription) => (
            <div key={subscription.priceId} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{subscription.name}</h2>
                <p>{subscription.description}</p>
                <p>${(subscription.price / 100).toFixed(2)} / {subscription.interval}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => handleSubscribe(subscription.priceId)}>
                    Get Pro
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;