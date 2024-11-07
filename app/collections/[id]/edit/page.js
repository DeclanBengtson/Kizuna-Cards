'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeckStyleSelector from '../../../components/Collections/DeckStyleSelector';
import QuestionInput from '../../../components/QuestionInput';

const EditDeck = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [questions, setQuestions] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }

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
  }, [id, session, status, router]);

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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-pink-200 pt-16">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/50 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Edit Deck</h2>
          <form onSubmit={handleUpdateDeck} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deck Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter a memorable title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Describe your deck's purpose"
                rows={3}
                required
              />
            </div>

            <DeckStyleSelector selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
            <QuestionInput questions={questions} setQuestions={setQuestions} />

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Update Deck
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDeck;
