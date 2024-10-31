'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Christmas/Christmas_Front.png';
import BackImage from '../../public/Images/Christmas/Christmas_Back.png';
import ChristmasQuestions from '../../questions/ChristmasQuestions.json';

// Dynamically import the withAuth HOC with no SSR
const WithAuth = dynamic(() => import('../components/withAuth'), { ssr: false });

const Christmas = () => {
  const initialCards = ChristmasQuestions.slice(0, 1).map((question) => ({
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1,
  }));

  // Replace inline fontStyle with Tailwind classes
  const cardStyles = "font-titanOne font-bold text-green-600 text-3xl";

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center">
      <Deck
        initialCards={initialCards}
        questions={ChristmasQuestions}
        customStyles={`family-card ${cardStyles}`}
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

// Create a wrapper component that applies the HOC
const ChristmasPage = () => (
    <Christmas />
);

export default ChristmasPage;