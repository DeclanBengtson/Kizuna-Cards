"use client"; // Add this line to mark the component as a Client Component

import React from 'react';

const Success = () => {
  return (
    <div className="success-page flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="card w-96 bg-white shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Subscription Successful!</h1>
        <p className="text-lg text-gray-700">
          Thank you for subscribing. Your subscription has been successfully processed.
        </p>
        <button className="btn btn-primary mt-6">Browse our Decks!</button>
      </div>
    </div>
  );
};

export default Success;