"use client"; // Add this line to mark the component as a Client Component

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './subscription.css';

const stripePromise = loadStripe('pk_live_51Q7aOCP1puy8XJGNgZZz8HOtmiIJVQspEJ2QIalMLT3CkdYdNQjEBX9y8Lmrz6DgyKpcWr7MuC4oxBx4h2M2ggtZ00xtvTVC48');

const Subscriptions = () => {
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
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="subscriptions-page">
      <h1>Choose Your Subscription Plan</h1>
      <div className="subscriptions-container">
        {subscriptions.map((subscription) => (
          <div key={subscription.priceId} className="subscription-card">
            <h2>{subscription.name}</h2>
            <p>{subscription.description}</p>
            <p>${(subscription.price / 100).toFixed(2)} / {subscription.interval}</p>
            <button onClick={() => handleSubscribe(subscription.priceId)}>
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;