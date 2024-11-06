import React from 'react';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Friends/Friends_Front.png';
import BackImage from '../../public/Images/Friends/Friends_Back.png';
import friendsQuestions from '../../questions/friendsQuestions.json';

const FloatingBubble = () => (
  <div className="absolute rounded-full mix-blend-multiply filter blur-xl animate-float opacity-50" />
);

const Friends = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledQuestions = shuffleArray([...friendsQuestions]);
  const initialCards = shuffledQuestions.slice(0, 1).map((question, index) => ({
    id: index,
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  const remainingQuestions = shuffledQuestions.slice(1);
  const cardStyles = "font-titanOne font-bold text-orange-400 text-3xl";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 animate-gradient-xy" />
      
      {/* Floating bubbles */}
      <div className="absolute inset-0">
        <FloatingBubble />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-1 opacity-50" />
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-2 opacity-50" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-3 opacity-50" />
      </div>

      {/* Content container */}
      <div className="relative flex flex-col justify-center items-center h-full w-full z-10">
        <Deck
          initialCards={initialCards}
          questions={remainingQuestions}
          customStyles={`friends-card ${cardStyles}`}
          frontImage={FrontImage.src}
          backImage={BackImage.src}
        />
      </div>
    </div>
  );
};

// Add these custom animations to your tailwind.config.js
const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay-1': 'float 7s ease-in-out infinite',
        'float-delay-2': 'float 8s ease-in-out infinite',
        'float-delay-3': 'float 9s ease-in-out infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          }
        }
      }
    }
  }
};

export default Friends;