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

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center"

    >
      <Deck
        initialCards={initialCards}
        questions={friendsQuestions}
        customStyles="friends-card"
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default Friends;