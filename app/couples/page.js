import React from 'react';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Couples/Couples_Front.png';
import BackImage from '../../public/Images/Couples/Couples_Back.png';

import friendsQuestions from '../../questions/friendsQuestions.json';
import Wallpaper from '../../public/Images/Backgrounds/Couples.png';

const Lovers = () => {
  const initialCards = friendsQuestions.slice(0, 1).map((question) => ({
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));


  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Wallpaper.src})`  }}
    >
      <Deck
        initialCards={initialCards}
        questions={friendsQuestions}
        customStyles="lovers-card"
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default Lovers;