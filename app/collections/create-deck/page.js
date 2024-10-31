'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DeckStyleSelector from '../../components/DeckStyleSelector';
import QuestionInput from '../../components/QuestionInput';

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [questions, setQuestions] = useState([]); // Assuming QuestionInput updates this state
  const [decks, setDecks] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreateDeck = async (e) => {
    e.preventDefault();

    if (!session) {
      console.error('User is not authenticated');
      return;
    }

    if (questions.length === 0) {
      alert('Please add at least one question to the deck.');
      return;
    }

    const userId = session.user.id;
    const newDeck = { title, description, style: selectedStyle, questions, userId };

    const response = await fetch('/api/decks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDeck),
    });

    if (response.ok) {
      const createdDeck = await response.json();
      setDecks([...decks, createdDeck.deck]);
      setTitle('');
      setDescription('');
      setSelectedStyle(null);
      setQuestions([]);
      router.push('/collections');
    } else {
      console.error('Failed to create deck');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 pt-24 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create a New Deck</h2>
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Deck Style</label>
            <DeckStyleSelector
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />
          </div>
          <div className="mb-4">
            <QuestionInput questions={questions} setQuestions={setQuestions} />
          </div>
          <button type="submit" className="btn btn-primary w-full mb-4">
            Create Deck
          </button>
          <button
            type="button"
            onClick={() => router.push('/collections')}
            className="btn btn-secondary w-full"
          >
            Back to Collections
          </button>
        </form>
      </div>
    </div>
  );
};

// Dynamically import the withAuth HOC with no SSR
const WithAuth = dynamic(() => import('../../components/withAuth'), { ssr: false });

// Create a wrapper component that applies the HOC
const CreateDeckPage = () => (
  <WithAuth>
    <CreateDeck />
  </WithAuth>
);

export default CreateDeckPage;