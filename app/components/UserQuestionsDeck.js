// UserQuestionsDeck.js
'use client';

import React, { useEffect, useState } from 'react';
import Deck from './Deck';
import { useParams } from 'next/navigation';

const UserQuestionsDeck = () => {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!params.id) {
        setError('No user ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users/${params.id}/questions`);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          setError('Failed to fetch questions');
        }
      } catch (error) {
        setError('Error fetching questions: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">No questions found</p>
      </div>
    );
  }

  const initialCards = questions.map((question, index) => ({
    id: index + 1,
    frontContent: `Question ${index + 1}`,
    backContent: question.content,
    isFlipped: false,
    isSlid: false,
    zIndex: 1,
  }));

  const cardStyles = "font-bold text-xl text-blue-500";

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
      <Deck
        title="User Questions"
        initialCards={initialCards}
        questions={questions}
        customStyles={`daisy-card ${cardStyles}`}
        frontImage=""
        backImage=""
      />
    </div>
  );
};

export default UserQuestionsDeck;