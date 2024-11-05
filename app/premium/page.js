'use client';
import React from 'react';
import Subscriptions from '../components/subscriptions/subscriptionsembed';

const Premium = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-500">
        {/* This is the stripe side */}
      </div>
      <div className="w-1/2 bg-white flex justify-center items-center">
        {/* This is the side where you can add an image or content */}
        <Subscriptions />
      </div>
    </div>
  );
};

export default Premium;