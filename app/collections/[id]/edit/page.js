'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeckStyleSelector from '../../../components/DeckStyleSelector';
import QuestionInput from '../../../components/QuestionInput';

const EditDeck = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [questions, setQuestions] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await fetch(`/api/decks/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setSelectedStyle(data.style);
        setQuestions(data.questions);
      } else {
        console.error('Failed to fetch deck');
      }
    };

    if (id) {
      fetchDeck();
    }
  }, [id]);

  const handleUpdateDeck = async (e) => {
    e.preventDefault();

    if (!session) {
      console.error('User is not authenticated');
      return;
    }

    const updatedDeck = { title, description, style: selectedStyle, questions };

    const response = await fetch(`/api/decks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDeck),
    });

    if (response.ok) {
      router.push('/collections');
    } else {
      console.error('Failed to update deck');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 pt-24 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Deck</h2>
        <form onSubmit={handleUpdateDeck}>
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
            Update Deck
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

export default EditDeck;