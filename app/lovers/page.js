// app/lovers/page.js
import React from 'react';
import Deck from '../components/Deck';
import './Lovers.css'; 

import FrontImage from '../../public/Images/Lovers_Background.png';
import BackImage from '../../public/Images/Lovers_Background.png';

import friendsQuestions from '../../questions/friendsQuestions.json';


const Lovers = () => {
  const initialCards = friendsQuestions.slice(0, 1).map((question) => ({
    ...question,
    isFlipped: false,
    isSlid: false,
    zIndex: 1
  }));

  return (
    <div className="lovers-page">
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