'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus, Search } from 'lucide-react';
import DeckCard from '../components/Collections/DeckCard';

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
    router.push('/collections/create-deck');
  };

  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">Loading your collections...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-pink-200 relative pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Your Collections
          </h1>
          <div className="w-24 h-1 bg-black mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
        </div>

        {/* Search and Create Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            onClick={handleCreateDeck}
            className="px-6 py-3 bg-white text-black rounded-xl border border-gray-300 hover:shadow-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 transform"
            >
            <Plus className="w-5 h-5" />
            Create Deck
          </button>
        </div>

        {/* Collections Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((collection) => (
            <div key={collection._id} className="transform hover:scale-102 transition-all duration-200">
              <DeckCard deck={collection} onDelete={handleDelete} />
            </div>
          ))}
          {filteredCollections.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <div className="text-gray-500 text-lg">
                {searchTerm ? 'No collections match your search.' : 'Create your first collection!'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;