'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Family/Family_Front.png';
import BackImage from '../../public/Images/Family/Family_Back.png';
import familyQuestions from '../../questions/FamilyQuestions.json';


const FloatingBubble = () => (
  <div className="absolute rounded-full mix-blend-multiply filter blur-xl animate-float opacity-50" />
);

const Family = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledQuestions = shuffleArray([...familyQuestions]);
  const initialCards = shuffledQuestions.slice(0, 1).map((question, index) => ({
    id: index,
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  const remainingQuestions = shuffledQuestions.slice(1);
  const cardStyles = "font-titanOne font-bold text-3xl text-cyan-500";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-cyan-100 to-sky-200 animate-gradient-xy" />
      
      {/* Floating bubbles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-1 opacity-40" />
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-2 opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-3 opacity-30" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl animate-float-delay-4 opacity-40" />
      </div>

      {/* Content container */}
      <div className="relative flex flex-col justify-center items-center h-full w-full z-10">
        <Deck
          initialCards={initialCards}
          questions={remainingQuestions}
          customStyles={`family-card ${cardStyles}`}
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
        'float-delay-4': 'float 10s ease-in-out infinite',
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

export default Family;