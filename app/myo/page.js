// pages/create-deck.js
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [decks, setDecks] = useState([]);

  const handleCreateDeck = (e) => {
    e.preventDefault();
    const newDeck = { title, description };
    setDecks([...decks, newDeck]);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create a New Deck</h2>
        <form onSubmit={handleCreateDeck}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Deck Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter deck title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Enter deck description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Create Deck
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-10">
        <h2 className="text-xl font-bold mb-4">Your Decks</h2>
        {decks.length === 0 ? (
          <p className="text-gray-500">No decks created yet.</p>
        ) : (
          <ul className="space-y-4">
            {decks.map((deck, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{deck.title}</h3>
                <p className="text-gray-700">{deck.description}</p>
              </li>
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
const CreateDeckPage = () => (
   <WithAuth>
    <CreateDeck />
    </WithAuth> 
);

export default CreateDeckPage;