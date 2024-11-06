'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/New_Connections/NewConnections_Front.png';
import BackImage from '../../public/Images/New_Connections/NewConnections_Back.png';
import NewConnectionsQuestions from '../../questions/NewConnectionsQuestions.json';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const NewConnections = () => {
  const shuffledQuestions = shuffleArray([...NewConnectionsQuestions]);
  const initialCards = shuffledQuestions.slice(0, 1).map((question, index) => ({
    id: index,
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  const remainingQuestions = shuffledQuestions.slice(1); // Get remaining shuffled questions


  // Replace inline fontStyle with Tailwind classes
  const cardStyles = "font-titanOne font-bold text-purple-600 text-3xl";

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center">
      <Deck
        initialCards={initialCards}
        questions={remainingQuestions}
        customStyles={`family-card ${cardStyles}`}
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default NewConnections;