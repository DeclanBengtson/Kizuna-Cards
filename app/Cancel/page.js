// app/cancel/page.js

"use client"; // Add this line to mark the component as a Client Component

import React from 'react';

const Cancel = () => {
  return (
    <div className="cancel-page flex flex-col items-center justify-center min-h-screen bg-white-50">
      <div className="card w-96 bg-white shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Subscription Cancelled</h1>
        <p className="text-lg text-gray-700">
          Your subscription process was cancelled. If this was a mistake, you can try again.
        </p>
        <button className="btn btn-secondary mt-6">Try Again</button>
      </div>
    </div>
  );
};

export default Cancel;