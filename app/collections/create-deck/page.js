'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeckStyleSelector from '../../components/Collections/DeckStyleSelector';
import QuestionInput from '../../components/QuestionInput';

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [decks, setDecks] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session status to resolve
    if (!session) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

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

  if (status === 'loading') {
    return <p>Loading...</p>; // Optional: Loading state while checking session
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 pt-24">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create a New Deck</h2>
        <form onSubmit={handleCreateDeck} className="space-y-4">
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
          <div className="flex space-x-4">
            <div className="flex-1">
              <QuestionInput questions={questions} setQuestions={setQuestions} />
            </div>
          </div>
          <button type="submit" className="btn bg-black text-white w-full">
            Create Deck
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDeck;
