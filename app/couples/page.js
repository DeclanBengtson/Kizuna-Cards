import React from 'react';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Couples/Couples_Front.png';
import BackImage from '../../public/Images/Couples/Couples_Back.png';

import loversQuestions from '../../questions/loversQuestions.json';
import Wallpaper from '../../public/Images/Backgrounds/Couples.png';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Lovers = () => {
  const shuffledQuestions = shuffleArray([...loversQuestions]);
  const initialCards = shuffledQuestions.slice(0, 1).map((question, index) => ({
    id: index,
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  const remainingQuestions = shuffledQuestions.slice(1);

  const cardStyles = "font-titanOne font-bold text-3xl text-pink-400";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 animate-gradient-xy" />
      
      {/* Floating bubbles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-1 opacity-40" />
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-2 opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-3 opacity-30" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-4 opacity-30" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl animate-float opacity-40" />
      </div>

      {/* Content container */}
      <div className="relative flex flex-col justify-center items-center h-full w-full z-10">
        <Deck
          initialCards={initialCards}
          questions={remainingQuestions}
          customStyles={`lovers-card ${cardStyles}`}
          frontImage={FrontImage.src}
          backImage={BackImage.src}
        />
      </div>
    </div>
  );
};

export default Lovers;
