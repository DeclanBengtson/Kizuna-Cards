import React from 'react';
import Deck from '../components/Deck';
import './friends.css';

import FrontImage from '../../public/Images/Beige_Card.png';
import BackImage from '../../public/Images/Beige_Card_Back.png';
import friendsQuestions from '../../questions/friendsQuestions.json';

const Friends = () => {
  const initialCards = friendsQuestions.map((question, index) => ({
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  return (
    <div className="friends-page">
      <Deck
        title="Friends Deck"
        initialCards={initialCards}
        customStyles="friends-card"
        frontImage={FrontImage.src}
        backImage={BackImage.src}
      />
    </div>
  );
};

export default Friends;