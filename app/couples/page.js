import React from 'react';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Couples/Couples_Front.png';
import BackImage from '../../public/Images/Couples/Couples_Back.png';

import friendsQuestions from '../../questions/friendsQuestions.json';
import Wallpaper from '../../public/Images/Backgrounds/Couples.png';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Lovers = () => {
  const shuffledQuestions = shuffleArray([...familyQuestions]);
  const initialCards = shuffledQuestions.slice(0, 1).map((question, index) => ({
    id: index,
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  const remainingQuestions = shuffledQuestions.slice(1); // Get remaining shuffled questions

  // Replace inline fontStyle with Tailwind classes
  const cardStyles = "font-titanOne font-bold text-pink-400 text-3xl ";

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Wallpaper.src})` }}
    >
      <Deck
        initialCards={initialCards}
        questions={remainingQuestions}
        customStyles={`lovers-card ${cardStyles}`}
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default Lovers;