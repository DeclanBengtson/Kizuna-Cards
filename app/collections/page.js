// pages/Collections.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import DeckCard from '../components/DeckCard';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    const fetchCollections = async () => {
      const response = await fetch(`/api/decks?userId=${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      }
    };

    fetchCollections();
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 pt-24">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Collections</h2>
          <button
            onClick={() => router.push('/collections/create-deck')}
            className="btn btn-primary"
          >
            Create New Deck
          </button>
        </div>
        {collections.length === 0 ? (
          <p className="text-gray-500">No collections available.</p>
        ) : (
          <ul className="space-y-4">
            {collections.map((collection) => (
              <DeckCard key={collection._id} deck={collection} />
            ))}
          </ul>
        )}
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