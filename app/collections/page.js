'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus } from 'lucide-react';
import DeckCard from '../components/Collections/DeckCard';
import CreateDeckCard from '../components/Collections/CreateDeckCard';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
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

  const handleCreateDeck = () => {
    router.push('/create-deck');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold">Your Collections</h1>
          <div className="flex gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered flex-grow sm:flex-grow-0 sm:w-64"
            />
            <button
              onClick={handleCreateDeck}
              className="btn bg-white text-black flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Deck
            </button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((collection) => (
            <DeckCard key={collection._id} deck={collection} onDelete={handleDelete} />
          ))}
          {filteredCollections.length === 0 && (
            <div className="text-center text-gray-500">No collections available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;