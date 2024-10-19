import React from 'react';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Couples/Couples_Front.png';
import BackImage from '../../public/Images/Couples/Couples_Back.png';

import friendsQuestions from '../../questions/friendsQuestions.json';

const Lovers = () => {
  const initialCards = friendsQuestions.slice(0, 1).map((question) => ({
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  const wallpaperUrl = '../../public/Images/Backgrounds/Couples.png'; // Update with your wallpaper path

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${wallpaperUrl})` }}
    >
      <Deck
        title="Lovers Questions"
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