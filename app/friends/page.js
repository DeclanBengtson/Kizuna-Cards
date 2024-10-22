import React from 'react';
import Deck from '../components/Deck';

import FrontImage from '../../public/Images/Friends/Friends_Front.png';
import BackImage from '../../public/Images/Friends/Friends_Back.png';
import friendsQuestions from '../../questions/friendsQuestions.json';

const Friends = () => {
  const initialCards = friendsQuestions.slice(0, 1).map((question) => ({
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  const fontStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    color: '#FF8C00', // Dark orange color
    padding: '0 20px', // Add padding to the sides
    };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center"

    >
      <Deck
        initialCards={initialCards}
        questions={friendsQuestions}
        customStyles="friends-card"
        fontStyle={fontStyle}
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default Friends;