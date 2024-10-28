// pages/Collections.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Collections = () => {
  const [collections, setCollections] = useState([
    { id: 1, name: 'Family Deck', description: 'A deck for family gatherings' },
    { id: 2, name: 'Work Deck', description: 'A deck for work colleagues' },
    // Add more mock collections as needed
  ]);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 pt-24">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Collections</h2>
        {collections.length === 0 ? (
          <p className="text-gray-500">No collections available.</p>
        ) : (
          <ul className="space-y-4">
            {collections.map((collection) => (
              <li key={collection.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{collection.name}</h3>
                <p className="text-gray-700">{collection.description}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => router.push('/collections/create-deck')}
          className="btn btn-primary w-full mt-4"
        >
          Create New Deck
        </button>
      </div>
    </div>
  );
};

// Dynamically import the withAuth HOC with no SSR
const WithAuth = dynamic(() => import('../components/withAuth'), { ssr: false });

// Create a wrapper component that applies the HOC
const CollectionsPage = () => (
  //  <WithAuth>
    <Collections />
    // </WithAuth> 
);

export default CollectionsPage;