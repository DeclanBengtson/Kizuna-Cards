// pages/Collections.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const router = useRouter();
  const userId = 'your-user-id'; // Replace with actual user ID from authentication context

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch(`/api/decks?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      }
    };

    fetchCollections();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 pt-24">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Collections</h2>
        {collections.length === 0 ? (
          <p className="text-gray-500">No collections available.</p>
        ) : (
          <ul className="space-y-4">
            {collections.map((collection) => (
              <li key={collection._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{collection.title}</h3>
                <p className="text-gray-700">{collection.description}</p>
                <ul className="list-disc list-inside mt-2">
                  {collection.questions.map((question, index) => (
                    <li key={index} className="text-gray-600">{question}</li>
                  ))}
                </ul>
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
    <WithAuth>
    <Collections />
     </WithAuth> 
);

export default CollectionsPage;