'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeckCard from '../components/Collections/DeckCard';
import CreateDeckCard from '../components/Collections/CreateDeckCard';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session status to resolve
    if (!session) {
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchCollections = async () => {
      const response = await fetch(`/api/decks?userId=${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      }
    };

    fetchCollections();
  }, [session, status, router]);

  const handleDelete = (id) => {
    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection._id !== id)
    );
  };

  if (status === 'loading') {
    return <p>Loading...</p>; // Optional: Loading state while checking session
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 pt-24">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Collections</h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          <CreateDeckCard />
          {collections.map((collection) => (
            <DeckCard key={collection._id} deck={collection} onDelete={handleDelete} />
          ))}
        </ul>
        {collections.length === 0 && (
          <p className="text-gray-500">No collections available.</p>
        )}
      </div>
    </div>
  );
};

export default Collections;
